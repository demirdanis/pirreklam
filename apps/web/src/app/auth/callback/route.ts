import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token || token.length < 32) {
    return NextResponse.redirect(
      new URL('/login?error=invalid_token', req.url)
    );
  }

  const cookieStore = await cookies();

  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 gün
    path: '/',
  });

  const rawRedirect = req.nextUrl.searchParams.get('redirectUrl');
  // Only allow relative paths (starts with /) to prevent open-redirect attacks
  const safePath =
    rawRedirect && rawRedirect.startsWith('/') ? rawRedirect : '/';

  return NextResponse.redirect(new URL(safePath, req.url));
}
