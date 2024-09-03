import { resend } from '@/lib/resend';
import { NextRequest } from 'next/server';
import VerificationEmail from '../../../../emails/verificationEmail';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url, token, from, name, to, host, passwordTemp } = body;
        const { data, error } = await resend.emails.send({
            from: `${name} <${from}>`,
            to: [to],
            subject: passwordTemp ? `Confirmer votre email sur ${host}` : 'Réinitialiser votre mot de passe',
            react: VerificationEmail({ url, passwordTemp }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
