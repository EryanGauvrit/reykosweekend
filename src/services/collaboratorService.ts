'use server';

import prisma from '@/lib/prisma';
import { isAuthanticated } from './authService';
import { AuthError } from 'next-auth';
import { collaboratorSchema } from '@/lib/zod/collaboratorSchema';
import { wrapResponse } from './queryService';
import { deleteFile } from './fileService';

export const collaboratorList = wrapResponse(async () => {
    return await prisma.collaborator.findMany({
        orderBy: {
            lastname: 'asc',
        },
    });
});

export const createCollaborator = wrapResponse(async (formData: FormData) => {
    const userAuth = await isAuthanticated();

    if (!userAuth || !userAuth.email) {
        throw new AuthError('Unauthorized');
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userAuth.email,
        },
    });
    if (!user || !user.isAdmin) {
        throw new AuthError('Unauthorized');
    }

    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;

        return {
            ...res,
            youtube: res.youtube ? res.youtube : undefined,
            facebook: res.facebook ? res.facebook : undefined,
            instagram: res.instagram ? res.instagram : undefined,
            linkedin: res.linkedin ? res.linkedin : undefined,
            website: res.website ? res.website : undefined,
            email: res.email ? res.email : undefined,
        };
    };
    const formZod = getFormZod();

    const { success, error, data } = collaboratorSchema.safeParse(formZod);

    if (!success) {
        throw error;
    }

    return await prisma.collaborator.create({
        data,
    });
});

export const updateCollaborator = wrapResponse(async (formData: FormData) => {
    const userAuth = await isAuthanticated();
    const id = parseInt(formData.get('id') as string);

    if (!userAuth || !userAuth.email) {
        throw new AuthError('Unauthorized');
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userAuth.email,
        },
    });
    if (!user || !user.isAdmin) {
        throw new AuthError('Unauthorized');
    }

    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;

        return {
            ...res,
            youtube: res.youtube ? res.youtube : undefined,
            facebook: res.facebook ? res.facebook : undefined,
            instagram: res.instagram ? res.instagram : undefined,
            linkedin: res.linkedin ? res.linkedin : undefined,
            website: res.website ? res.website : undefined,
            email: res.email ? res.email : undefined,
        };
    };
    const formZod = getFormZod();

    const { success, error, data } = collaboratorSchema.safeParse(formZod);

    if (!success) {
        throw error;
    }

    return await prisma.collaborator.update({
        where: {
            id,
        },
        data,
    });
});

export const deleteCollaborator = wrapResponse(async (id: number) => {
    const userAuth = await isAuthanticated();

    if (!userAuth || !userAuth.email) {
        throw new AuthError('Unauthorized');
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userAuth.email,
        },
    });
    if (!user || !user.isAdmin) {
        throw new AuthError('Unauthorized');
    }

    const collaborator = await prisma.collaborator.findUnique({
        where: {
            id,
        },
    });

    if (!collaborator) {
        throw new Error('Collaborator not found');
    }

    collaborator.image && (await deleteFile(collaborator.image));

    return await prisma.collaborator.delete({
        where: {
            id,
        },
    });
});
