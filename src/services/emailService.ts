'use server';

import { resend } from '@/lib/resend';
import ContactEmail from '../../emails/contactEmail';
import { wrapResponse } from './queryService';
import { getWebSiteSettings } from './webSiteSettingsService';

const from = process.env.EMAIL_FROM;

export const sendContactEmail = wrapResponse(async (formData: FormData) => {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstname') as string;
    const lastName = formData.get('lastname') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const webSiteSettings = await getWebSiteSettings();

    if (!webSiteSettings || !from) {
        return {
            isErrored: true,
            variant: 'destructive',
            title: 'Erreur',
            description: "Le site n'a pas été configuré correctement",
        };
    }

    await resend.emails.send({
        from: `${webSiteSettings.title} <${from}>`,
        to: [webSiteSettings.emailContact],
        subject: `Nouveau message de ${firstName} ${lastName} - ${subject}`,
        react: ContactEmail({ firstName, lastName, email, subject, message }),
    });
});

export const sendForgotPasswordEmail = wrapResponse(async (formData: FormData) => {
    const email = formData.get('email') as string;
    const token = formData.get('token') as string;
    const webSiteSettings = await getWebSiteSettings();

    if (!webSiteSettings || !from) {
        return {
            isErrored: true,
            variant: 'destructive',
            title: 'Erreur',
            description: "Le site n'a pas été configuré correctement",
        };
    }
});
