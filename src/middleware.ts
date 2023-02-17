import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { TOKEN_KEY } from '@/common/auth';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  if (!PUBLIC_FILE.test(request.url)) {
    const token = request.cookies.get(TOKEN_KEY)?.value;

    if (token && ['/login', '/signup'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
