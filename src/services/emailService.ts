'use server';

import { resend } from '@/lib/resend';
import ContactEmail from '../../emails/contactEmail';
import NewRegistration from '../../emails/newRegistration';
import ParticipantEmail from '../../emails/participantEmail';
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

export const sendEmail = wrapResponse(async (formData: FormData) => {
    const webSiteSettings = await getWebSiteSettings();

    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const to = formData.get('emails') as string;

    if (!webSiteSettings || !from) {
        return {
            isErrored: true,
            variant: 'destructive',
            title: 'Erreur',
            description: "Le site n'a pas été configuré correctement",
        };
    }

    if (!subject || !message || !to) {
        return {
            isErrored: true,
            variant: 'destructive',
            title: 'Erreur',
            description: 'Veuillez remplir tous les champs',
        };
    }

    const mails = to.split(',').map((email) => {
        return {
            from: `${webSiteSettings.title} <${from}>`,
            to: [email.trim()],
            subject,
            react: ParticipantEmail({ message }),
        };
    });

    const res = await resend.batch.send(mails);

    if (res.error) {
        throw new Error(JSON.stringify(res.error));
    }
});

export const sendNewRegistrationEmail = wrapResponse(async (email: string, message: string) => {
    const webSiteSettings = await getWebSiteSettings();
    const APP_URL = process.env.APP_URL;

    if (!webSiteSettings || !from || !APP_URL) {
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
        subject: `Nouvelle demande d'inscription`,
        react: NewRegistration({ message, email, url: APP_URL + '/dashboard' }),
    });
});
