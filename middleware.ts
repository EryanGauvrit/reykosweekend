import { auth } from 'auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const reqUrl = req.nextUrl.pathname;
    const session = req.auth;

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
