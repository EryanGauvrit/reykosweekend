import prisma from '@/lib/prisma';
import { login } from '@/services/authService';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}

export const BASE_PATH = '/api/auth';

const credentialsConfig = Credentials({
    credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
        const user = await login({
            email: credentials.email as string,
            password: credentials.password as string,
        });
        if (!user) {
            throw new InvalidLoginError();
        }

        return user;
    },
});

const ResendConfig = Resend({
    from: process.env.EMAIL_FROM,
    name: "Reyko's weekend",
    async sendVerificationRequest({ identifier: email, url, token, provider, request }) {
        // password is in body
        const body = request?.body;
        if (!body) {
            throw new Error('No body');
        }

        const userExist = await prisma.user.findUnique({
            where: { email },
        });

        if (!userExist) throw new Error('User not found');

        const { value } = await body.getReader().read();
        const bodyData = new TextDecoder().decode(value);
        const { passwordTemp } = JSON.parse(bodyData);
        const { host } = new URL(url);
        const res = await fetch(`${process.env.APP_URL}/api/emails/verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: provider.name,
                from: provider.from,
                host,
                to: email,
                url,
                token,
                passwordTemp,
            }),
        });

        if (!res.ok) throw new Error('Resend error: ' + JSON.stringify(await res.json()));
    },
});

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    basePath: BASE_PATH,
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
        verifyRequest: '/auth/verify',
    },
    providers: [credentialsConfig, ResendConfig],
});
