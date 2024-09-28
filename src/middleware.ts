import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicPaths = ['/user/sign-in', '/user/sign-out', '/user/sign-up', '/api/auth'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api')) {
    const token = await getToken({ req });

    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    return NextResponse.next();
  }

  const session = await getToken({ req });
  // if (!session) {
  //   return NextResponse.redirect('http://localhost:3000/api/auth/signin');
  // }

  return NextResponse.next();
}
