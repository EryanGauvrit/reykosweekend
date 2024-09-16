'use server';

import prisma from '@/lib/prisma';
import { streamerSchema } from '@/lib/zod/streamerSchema';
import { isAdmin } from './authService';
import { wrapResponse } from './queryService';

export const createStreamer = wrapResponse(async (formData: FormData) => {
    const admin = await isAdmin();
    if (!admin) {
        throw new Error('Unauthorized');
    }

    const { streamer } = Object.fromEntries(formData) as Record<string, string>;
    const { name, twitch, youtube, instagram, discord, website } = JSON.parse(streamer);

    const { success, error, data } = await streamerSchema.safeParse({
        name: name.trim(),
        twitch,
        youtube: youtube || undefined,
        instagram: instagram || undefined,
        discord: discord || undefined,
        website: website || undefined,
    });

    if (!success) {
        throw error;
    }

    return await prisma.streamer.create({
        data,
    });
});

export const updateStreamer = wrapResponse(async (formData: FormData) => {
    const admin = await isAdmin();
    if (!admin) {
        throw new Error('Unauthorized');
    }

    const { streamer, id } = Object.fromEntries(formData) as Record<string, string>;
    const streamerData = JSON.parse(streamer);

    const { success, error, data } = await streamerSchema.safeParse({
        ...streamerData,
        name: streamerData.name.trim(),
        youtube: streamerData.youtube || undefined,
        instagram: streamerData.instagram || undefined,
        discord: streamerData.discord || undefined,
        website: streamerData.website || undefined,
    });

    if (!success) {
        throw error;
    }

    const streamerFound = await prisma.streamer.findUnique({
        where: {
            id,
        },
    });

    if (!streamerFound) {
        throw new Error('Streamer not found');
    }

    return await prisma.streamer.update({
        where: {
            id,
        },
        data,
    });
});

export const deleteStreamer = wrapResponse(async (id: string) => {
    const admin = await isAdmin();
    if (!admin) {
        throw new Error('Unauthorized');
    }

    const streamerFound = await prisma.streamer.findUnique({
        where: {
            id,
        },
    });

    if (!streamerFound) {
        throw new Error('Streamer not found');
    }

    return await prisma.streamer.delete({
        where: {
            id,
        },
    });
});
