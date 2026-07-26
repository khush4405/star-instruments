import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminSecret = process.env.ADMIN_SECRET;

  // If ADMIN_SECRET is not configured, block all admin access
  if (!adminSecret) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  const secret = new TextEncoder().encode(adminSecret);

  // Protect /admin and /api/save-content
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    const token = request.cookies.get('admin-session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      const response = NextResponse.redirect(new URL('/admin-login', request.url));
      response.cookies.delete('admin-session');
      return response;
    }
  }

  if (pathname === '/api/save-content') {
    const token = request.cookies.get('admin-session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/save-content'],
};
