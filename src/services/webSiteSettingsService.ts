'use server';

import prisma from '@/lib/prisma';
import { isAuthanticated } from './authService';
import { wrapResponse } from './queryService';

export const getWebSiteSettings = async () => {
    return prisma.webSiteSettings.findFirst();
};

export const updateWebSiteSettings = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    await prisma.webSiteSettings.update({
        where: {
            id: Number(formData.get('id')),
        },
        data: {
            title: (formData.get('title') as string) || undefined,
            description: (formData.get('description') as string) || undefined,
            subtitle: (formData.get('subtitle') as string) || undefined,
            imageDesktop: (formData.get('imageDesktop') as string) || undefined,
            imageMobile: (formData.get('imageMobile') as string) || undefined,
            video: (formData.get('video') as string) || '',
        },
    });
});

export const updateGlobalSettings = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    await prisma.webSiteSettings.update({
        where: {
            id: Number(formData.get('id')),
        },
        data: {
            // Global
            logo: (formData.get('logo') as string) || undefined,
            logoWhite: (formData.get('logoWhite') as string) || undefined,
            favicon: (formData.get('favicon') as string) || undefined,
            emailContact: (formData.get('email') as string) || undefined,
            facebook: (formData.get('facebook') as string) || '',
            instagram: (formData.get('instagram') as string) || '',
            linkedin: (formData.get('linkedin') as string) || '',
            youtube: (formData.get('youtube') as string) || '',
        },
    });
});
