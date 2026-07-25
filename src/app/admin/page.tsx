import React from 'react';
import fs from 'fs';
import path from 'path';
import AdminClient from './AdminClient';

// Ensure this page is not statically cached since it reads from a local file that changes
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
  let initialData = { tree: [], reviews: [], videos: [], certificates: [] };
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    initialData = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to read masterContent.json", error);
  }

  return <AdminClient initialData={initialData} />;
}
