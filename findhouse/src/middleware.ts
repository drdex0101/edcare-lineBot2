import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');

  if (!token) {
    // 未登入，跳轉到 LINE Login 授權頁
    const lineLoginUrl = new URL('https://access.line.me/oauth2/v2.1/authorize');
    lineLoginUrl.searchParams.set('response_type', 'code');
    lineLoginUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_LINE_CLIENT_ID!);
    lineLoginUrl.searchParams.set('redirect_uri', process.env.NEXT_PUBLIC_LINE_LOGIN_CALLBACK_URL!); 
    lineLoginUrl.searchParams.set('state', request.nextUrl.href); // 儲存原始請求 URL
    lineLoginUrl.searchParams.set('scope', 'profile openid email');
    return NextResponse.redirect(lineLoginUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/', '/nanny/:path*', '/parent/:path*', '/protected/:path*'], // 確保包含相關路徑
  };
