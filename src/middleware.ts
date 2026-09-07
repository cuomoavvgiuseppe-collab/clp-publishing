import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const session = req.cookies.get('admin_session')?.value;
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || session !== adminKey) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
