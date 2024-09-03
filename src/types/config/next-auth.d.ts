import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            isAdmin: boolean;
            password: string | null;
        } & DefaultSession['user'];
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        isAdmin: boolean;
    }
}
