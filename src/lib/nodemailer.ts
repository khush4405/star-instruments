import nodemailer from "nodemailer";

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  location?: string;
  productInterest?: string;
  message: string;
  source?: "contact_page" | "quick_inquiry";
}

/**
 * Creates and returns a Nodemailer Transporter instance based on environment variables.
 */
export function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const isSecure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    // Force IPv4 to prevent 2-minute IPv6 DNS resolution timeouts in Node 18+
    family: 4, 
    connectionTimeout: 10000, // 10s connection timeout
    greetingTimeout: 10000,   // 10s greeting timeout
    socketTimeout: 15000,     // 15s socket timeout
  });
}

/**
 * Generates styled HTML content for internal admin inquiry emails (sent to Star Instrument Engineers).
 */
export function generateInquiryHtml(data: EmailData) {
  const formTitle =
    data.source === "quick_inquiry"
      ? "Quick Inquiry Submission"
      : "Website Contact Form Submission";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0b192c 0%, #1e3a5f 100%); color: #ffffff; padding: 24px; text-align: center; }
          .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 4px 0 0 0; color: #38bdf8; font-size: 13px; font-weight: 600; text-transform: uppercase; }
          .content { padding: 24px; }
          .field-group { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
          .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #0f172a; font-weight: 500; word-break: break-word; }
          .message-box { background: #f1f5f9; border-left: 4px solid #f97316; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>STAR INSTRUMENT ENGINEERS</h2>
            <p>${formTitle}</p>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${escapeHtml(data.name)}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>

            <div class="field-group">
              <div class="field-label">Phone Number</div>
              <div class="field-value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
            </div>

            ${
              data.location
                ? `
            <div class="field-group">
              <div class="field-label">Location / City</div>
              <div class="field-value">${escapeHtml(data.location)}</div>
            </div>
            `
                : ""
            }

            ${
              data.productInterest
                ? `
            <div class="field-group">
              <div class="field-label">Product Interest</div>
              <div class="field-value">${escapeHtml(data.productInterest)}</div>
            </div>
            `
                : ""
            }

            <div class="field-group" style="border-bottom: none;">
              <div class="field-label">Requirement Details / Message</div>
              <div class="message-box">${escapeHtml(data.message)}</div>
            </div>
          </div>
          <div class="footer">
            Received via Star Instrument Engineers Web Portal
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates styled HTML confirmation email sent to the customer.
 */
export function generateCustomerAckHtml(data: EmailData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0b192c 0%, #1e3a5f 100%); color: #ffffff; padding: 28px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff; }
          .header p { margin: 6px 0 0 0; color: #f97316; font-size: 13px; font-weight: 600; text-transform: uppercase; }
          .content { padding: 28px; }
          .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
          .body-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px; }
          .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 24px; }
          .summary-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0b192c; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; }
          .summary-item { font-size: 13px; margin-bottom: 8px; color: #334155; }
          .summary-item strong { color: #0f172a; }
          .contact-box { background: #eff6ff; border-left: 4px solid #0284c7; padding: 14px 16px; border-radius: 6px; font-size: 13px; color: #1e40af; margin-bottom: 20px; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          .footer a { color: #f97316; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>STAR INSTRUMENT ENGINEERS</h1>
            <p>Inquiry Received Confirmation</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${escapeHtml(data.name)},</div>
            <div class="body-text">
              Thank you for reaching out to <strong>Star Instrument Engineers</strong>. We have successfully received your inquiry and specs.
              Our technical sales team is reviewing your requirements and will respond with a quotation or details within <strong>24 business hours</strong>.
            </div>

            <div class="summary-card">
              <div class="summary-title">Summary of Your Submission</div>
              <div class="summary-item"><strong>Name:</strong> ${escapeHtml(data.name)}</div>
              <div class="summary-item"><strong>Phone:</strong> ${escapeHtml(data.phone)}</div>
              ${data.productInterest ? `<div class="summary-item"><strong>Product Interest:</strong> ${escapeHtml(data.productInterest)}</div>` : ""}
              ${data.location ? `<div class="summary-item"><strong>Location:</strong> ${escapeHtml(data.location)}</div>` : ""}
              <div class="summary-item" style="margin-top: 10px;"><strong>Requirement Message:</strong></div>
              <div style="font-size: 13px; color: #475569; font-style: italic; background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 4px;">
                "${escapeHtml(data.message)}"
              </div>
            </div>

            <div class="contact-box">
              Need urgent assistance? Call our sales desk directly at <strong>+91 98242 81335</strong> or WhatsApp us for instant support.
            </div>
          </div>

          <div class="footer">
            Star Instrument Engineers — Premium Industrial Instrumentation<br/>
            Website: <a href="https://starinstruments.in">starinstruments.in</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
