# Business Website Architectural Blueprint
**Based on the Star Instruments Architecture**

This blueprint provides a comprehensive guide on how to replicate the highly efficient, cost-effective, and fully custom architecture used to build the Star Instruments website. You can use this as a reference guide when starting a similar B2B or corporate website.

---

## 1. Core Technology Stack
- **Framework:** [Next.js (App Router)](https://nextjs.org/) using TypeScript.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, modern, and responsive UI.
- **Icons:** `lucide-react` for lightweight SVG icons.
- **Email Service:** `nodemailer` for handling contact/inquiry forms.
- **Deployment:** Vercel (Frontend & Serverless APIs) + GitHub (Version Control).
- **Database:** None. We use a **Local JSON File** (`masterContent.json`) as our database.

---

## 2. Directory Structure Blueprint

Here is the exact folder structure you should initialize when starting a new project:

```text
src/
├── app/
│   ├── admin/                 # The Custom CMS / Admin Panel
│   │   ├── components/        # Admin UI (CatalogManager, VideosManager, CertificatesManager)
│   │   ├── layout.tsx         # Admin layout (Hides main site header/footer)
│   │   └── page.tsx           # Admin Dashboard Client Component (Handles Tab Switching)
│   ├── api/
│   │   ├── save-content/      # POST API to overwrite masterContent.json
│   │   │   └── route.ts
│   │   └── send-email/        # POST API to send inquiries via Nodemailer
│   │       └── route.ts
│   ├── products/
│   │   └── [...slug]/         # Dynamic Catch-All Route for categories/products
│   │       └── page.tsx
│   ├── globals.css            # Tailwind directives & custom CSS
│   ├── layout.tsx             # Main site layout (Navbar & Footer)
│   └── page.tsx               # Homepage
├── components/
│   ├── Navbar.tsx             # Public Site Navigation
│   ├── Footer.tsx             # Public Site Footer
│   └── ...                    # Reusable UI components (Buttons, Cards)
└── data/
    └── masterContent.json     # The central "Database" file
```

---

## 3. Data Architecture (The JSON Database)

Instead of paying for a database or a third-party headless CMS, all website data is managed in `src/data/masterContent.json`.

### Recommended Schema
The JSON structure must support infinite recursion to handle complex categories (folders within folders) and the products inside them, while also supporting flat arrays for modules like Videos and Certificates.

```json
{
  "tree": [
    {
      "id": "flow-meters",
      "type": "folder",
      "title": "Flow Meters",
      "subFolders": [],
      "products": [
        {
          "id": "ldc-series",
          "type": "product",
          "title": "LDC Series Flow Meter",
          "shortDesc": "High accuracy...",
          "specs": [
            { "label": "Accuracy", "value": "±0.5%" }
          ]
        }
      ]
    }
  ],
  "videos": [
    {
      "id": "vid-1",
      "title": "Company Overview",
      "embedUrl": "https://www.youtube.com/embed/..."
    }
  ],
  "certificates": [
    {
      "id": "cert-1",
      "title": "ISO 9001",
      "imagePath": "/images/iso.png"
    }
  ]
}
```

---

## 4. Building the Custom CMS (Admin Panel)

To manage the `masterContent.json` without manually editing code, you build an Admin Panel located at `/admin`.

### A. The API Route (`/api/save-content`)
To allow the frontend Admin Panel to save changes permanently, you need an API route that uses Node's `fs` (File System) module to overwrite the JSON file.

```typescript
// app/api/save-content/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
```

### B. Admin Features to Implement
1. **Multi-Tab Architecture:** Use React state to switch between different Managers (Catalog Manager, Videos Manager, Certificates Manager) within the same page.
2. **Recursive Tree UI:** A sidebar that maps the `tree` array so users can navigate into folders.
3. **Move Up / Move Down:** Logic to swap array indexes for products/folders so the client can manually order them.
4. **Modals with Forms:** To add/edit folders, products, videos, and certificates.
5. **Bulk Spec Paste:** A `<textarea>` that takes data copied from Excel, splits it by `\n` (newlines) and `\t` (tabs), and converts it into JSON spec objects.
6. **Backup Button:** A button that triggers a download of the current JSON state in case of accidental deletions.

---

## 5. Public Site Dynamic Routing

The public-facing site uses Next.js Catch-All routes (`[...slug]`) to render pages dynamically based on the JSON file.

### How it works:
1. A user visits `/products/flow-meters/electromagnetic/ldc-series`.
2. The `app/products/[...slug]/page.tsx` component receives the `slug` array: `['flow-meters', 'electromagnetic', 'ldc-series']`.
3. The component iterates through `masterContent.json`, matching the slugs against the `id` properties.
4. If the final matched item is a `folder`, it renders a Category Page (listing sub-folders and products).
5. If the final matched item is a `product`, it renders a Product Detail Page (showing images, descriptions, and the specs table).

*(For Videos and Certificates, you simply map over their respective arrays on their dedicated pages like `/videos` or `/certificates`.)*

---

## 6. Frontend UI Rendering & Design (The AI Prompt)

When you are starting a new project and want the AI to replicate the exact look, feel, and layout of the Star Instruments product/category pages (e.g., the `broil-sensotek-flow-measurement` page), you can copy and paste the following prompt to the AI:

> **"Build the dynamic `[...slug]/page.tsx` for my Next.js App Router project using Tailwind CSS. It should read from my `masterContent.json` file. 
> 
> If the slug resolves to a `folder`, render a Category Page: 
> - Use a dark, industrial glassmorphism theme (`bg-slate-950`).
> - Display a responsive grid of `subFolders` and `products`. 
> - Each card should have a dark, sleek design (`bg-slate-900`, `border-slate-800`) with hover effects (slight lift, glow, or border color change).
> - Truncate text nicely and ensure images use `object-cover`.
> 
> If the slug resolves to a `product`, render a highly detailed Product Page:
> - Include a clean breadcrumb navigation at the top.
> - Split the layout: Product Image on the left (or top on mobile), and Details (Title, Description) on the right.
> - Render the `specs` array as a beautiful, modern, zebra-striped HTML table. The table should have a subtle glass effect.
> - Include a 'Download Datasheet' button if a PDF is provided.
> - Emphasize a premium, high-tech B2B aesthetic using Slate, Blue, and Emerald color palettes."**

---

## 7. Email Functionality Setup

For contact forms and product inquiries, use Nodemailer in a Serverless environment.

### The API Route (`/api/send-email`)
```typescript
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
  });

  // IMPORTANT: You MUST await the sendMail function in Next.js Serverless environments
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "sales@yourcompany.com",
    subject: `New Inquiry from ${name}`,
    text: message,
    replyTo: email
  });
  
  return Response.json({ success: true });
}
```

---

## 7. Deployment Workflow

1. Push all code to a GitHub repository.
2. Import the repository into Vercel.
3. Add Environment Variables in Vercel for the SMTP (Email) credentials.
4. Deploy.
5. **Note on JSON Saving in Production:** When deployed to Vercel, the file system is read-only. This means the `/admin` panel's "Save Changes" button works locally on your machine, but not on the live Vercel site. 
   * **The Workflow:** The site owner runs the site locally on their computer (`npm run dev`), makes changes in the local `/admin` panel, saves it, and then commits/pushes the changes to GitHub. Vercel then automatically rebuilds and deploys the updated JSON file!
