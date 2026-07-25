import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
    
    // Write the file synchronously to disk
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error: any) {
    console.error('Error saving content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
