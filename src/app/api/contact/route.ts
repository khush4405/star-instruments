import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limiter";
import {
  getTransporter,
  generateInquiryHtml,
  generateCustomerAckHtml,
  EmailData,
} from "@/lib/nodemailer";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  location: z.string().max(100).optional().or(z.literal('')),
  productInterest: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(5).max(2000),
  source: z.enum(['contact_page', 'quick_inquiry']).optional(),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { allowed } = rateLimit(ip, 7, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    
    if (!parsed.success) {
      console.error("ZOD PARSE ERROR", parsed.error.issues, body);
      const details = parsed.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return NextResponse.json({ error: `Invalid form data - ${details}` }, { status: 400 });
    }

    const { name, email, phone, message, productInterest, source } = parsed.data;

    const transporter = getTransporter();
    const recipient =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.SMTP_USER;

    if (!recipient) {
      console.error("[Nodemailer] No recipient email configured");
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please contact us directly." },
        { status: 503 }
      );
    }

    // If SMTP credentials are not yet set up in .env.local
    if (!transporter) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: "Email service is temporarily unavailable. Please contact us directly." },
          { status: 503 }
        );
      }
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Simulated in dev mode.",
      });
    }

    const subjectText =
      source === "quick_inquiry"
        ? `[Inquiry] ${productInterest ? `${productInterest} - ` : ""}${name}`
        : `[Contact Form] Requirement from ${name}`;

    // Pass validated data as EmailData
    const validEmailData: EmailData = {
      name,
      email,
      phone,
      location: parsed.data.location,
      productInterest,
      message,
      source
    };

    const adminHtmlContent = generateInquiryHtml(validEmailData);
    const customerAckHtmlContent = generateCustomerAckHtml(validEmailData);

    const fromAddress = process.env.SMTP_USER;
    if (!fromAddress) {
      console.error("[Nodemailer] SMTP_USER not configured");
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please contact us directly." },
        { status: 503 }
      );
    }

    // Send both emails in parallel so the form responds fast
    const adminMailPromise = transporter.sendMail({
      from: `"Star Instrument Engineers" <${fromAddress}>`,
      to: recipient,
      replyTo: `"${name}" <${email}>`,
      subject: subjectText,
      html: adminHtmlContent,
      headers: {
        "X-Mailer": "StarInstrumentsMailer/1.0",
        "X-Priority": "1",
      },
    });

    const customerMailPromise = transporter.sendMail({
      from: `"Star Instrument Engineers" <${fromAddress}>`,
      to: email,
      subject: `Inquiry Confirmation — Star Instrument Engineers`,
      html: customerAckHtmlContent,
      headers: {
        "X-Mailer": "StarInstrumentsMailer/1.0",
      },
    });

    // Run email sending in the background without blocking the UI response
    Promise.allSettled([
      adminMailPromise,
      customerMailPromise,
    ]).then(results => {
      if (results[0].status === "rejected") {
        console.error("[Nodemailer] Admin mail failed", results[0].reason);
      }
      if (results[1].status === "rejected") {
        console.warn("[Nodemailer] Customer copy failed", results[1].reason);
      }
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent successfully!",
    });
  } catch (error: any) {
    console.error("[Nodemailer] Email send failed");
    return NextResponse.json(
      {
        error: "Failed to process your inquiry. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
