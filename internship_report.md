# Star Instruments - Internship Project Report

## 1. Project Overview
**Project Name:** Star Instruments Corporate Website & Custom CMS
**Objective:** To design, develop, and deploy a modern, high-performance corporate website for Star Instruments, complete with a fully custom Content Management System (CMS) to manage a large, multi-tier product catalog, video showcase, and project/certificate gallery. 
**Tech Stack:** 
- **Frontend Framework:** Next.js (React)
- **Styling:** Tailwind CSS (for rapid, responsive, and modern UI design)
- **State Management & Data Persistence:** Local JSON storage (`masterContent.json`) managed via Next.js API Routes.
- **Email Service:** Nodemailer (Serverless deployment compatible)
- **Version Control & Hosting:** Git, GitHub, and Vercel

---

## 2. System Architecture

Instead of relying on a third-party CMS (like WordPress or Strapi), we engineered a completely custom JSON-backed architecture. This approach provides lightning-fast page loads, eliminates database hosting costs, and gives complete control over the data structure.

### The "JSON-as-a-Database" Model
- **`masterContent.json`**: Acts as the single source of truth for the website. It stores the entire site's configuration across three main modules:
  1. The recursive folder structure for the **Product Catalog**.
  2. The **Video Showcase** array.
  3. The **Certificates/Project Gallery** array.
- **Frontend Dynamic Routing**: The Next.js frontend uses "Catch-all routes" (e.g., `/products/[...slug]`) to dynamically traverse the JSON tree and render category pages or individual product pages based on the URL path.
- **Backend API Routes**: A dedicated Next.js POST API route securely accepts changes from the Admin Panel and uses Node's file system (`fs`) to overwrite the JSON file, permanently saving the state.

---

## 3. Key Features & Development Highlights

### A. The Custom Admin Panel (CMS)
We built a comprehensive, authenticated Admin Dashboard that allows non-technical users to manage the website's content dynamically across three primary tabs:

1. **Catalog & Products Manager**
   - **Recursive Category Tree:** Built a multi-tier directory tree where admins can create infinite sub-folders and add products anywhere in the hierarchy.
   - **Advanced Ordering:** Implemented a "Move Up / Move Down" indexing system, allowing the admin to strictly control the display order of categories and products.
   - **Bulk Data Entry:** Engineered a parser that allows admins to copy tabular technical specifications directly from Excel or Google Sheets and paste them into the product modal, instantly converting them into structured key-value pairs.

2. **Video Showcase Manager**
   - Built a dedicated interface to manage video links (e.g., YouTube embeds).
   - Allows the admin to add video titles, descriptions, and thumbnails directly to the central JSON file.
   - Updates instantly reflect on the public-facing Video Showcase page.

3. **Certificates & Project Gallery Manager**
   - Engineered a module to handle company certificates, credentials, and project photos.
   - Admins can upload image paths, titles, and brief descriptions for awards and certifications, which dynamically map to a responsive grid gallery on the frontend.

**Global CMS Features:**
- **CRUD Operations:** Full capability to Create, Read, Update, and Delete across all three managers.
- **Backup & Snapshot System:** Added a utility that serializes the current live state into a Blob and triggers a local JSON file download, acting as a manual backup system.

### B. Automated Web Scraping & Data Population
To populate the massive catalog, we developed Python-based web scrapers using `BeautifulSoup`. 
- Scraped complex technical specifications, descriptions, and images from multiple competitor/supplier websites (e.g., *ht-sensors.com*, *hengkometer.com*, *boquinstruments.com*).
- Cleaned, parsed, and mapped the scraped HTML data directly into our `masterContent.json` structure, saving hundreds of hours of manual data entry.

### C. Modern UI/UX & Aesthetics
- **Responsive Design:** Utilized Tailwind CSS to ensure the website is flawless on mobile, tablet, and desktop viewports.
- **High-End Aesthetics:** Implemented glassmorphism, subtle micro-animations, and a highly polished color palette to give the brand a premium, industrial-tech feel.

### D. Serverless Email Integration
- Integrated `Nodemailer` directly into Next.js serverless API routes to handle contact form submissions. 
- Implemented strict TypeScript typing, Zod validation for security, and enforced `Promise` awaiting to prevent Vercel's serverless functions from terminating prematurely before emails were dispatched.

---

## 4. Challenges Overcome
1. **Recursive State Management:** Managing state in React for a deeply nested tree structure (Folders inside Folders) was complex. We solved this by maintaining an `activePath` state array to track user depth, and using recursive React components to render the tree map.
2. **Event Bubbling in the UI:** Early on, clicking "Delete" on a folder would trigger navigation into the folder instead. We resolved this by strictly implementing `e.stopPropagation()` on nested action buttons.
3. **PowerShell Compatibility in Automation:** Adjusted our automated terminal command chains to use PowerShell-compatible syntax (`;` instead of `&&`) for Git operations to ensure smooth CI/CD workflows.

---

## 5. Conclusion & Learning Outcomes
This internship project provided deep, hands-on experience with modern full-stack web development. I successfully moved beyond basic frontend frameworks and engineered a complete end-to-end system—handling everything from data scraping and UI/UX design, to serverless API development and custom CMS architecture. The result is a production-ready, highly maintainable platform for Star Instruments.
