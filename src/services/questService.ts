'use server';

import prisma from '@/lib/prisma';
import { questSchema } from '@/lib/zod/questSchema';
import { Prisma } from '@prisma/client';
import { isAuthanticated } from './authService';
import { wrapResponse } from './queryService';

export type QuestWhithAllInclude = Prisma.QuestGetPayload<{
    include: {
        description: true;
        teams: true;
        scoreReward: true;
        title: true;
        id: true;
        eventId: true;
    };
}>;

export const getQuestsList = wrapResponse(async (eventId: string) => {
    return await prisma.quest.findMany({
        where: {
            eventId: eventId,
        },
        orderBy: {
            title: 'asc',
        },
        select: {
            description: true,
            teams: true,
            scoreReward: true,
            title: true,
            id: true,
            eventId: true,
        },
    });
});

export const createQuest = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { quest } = Object.fromEntries(formData) as Record<string, string>;
    const questData = JSON.parse(quest);

    const { success, error, data } = questSchema.safeParse({ ...questData, scoreReward: parseInt(questData.scoreReward) });

    if (!success) {
        throw error;
    }

    return await prisma.quest.create({
        data: {
            ...data,
            title: data.title.trim(),
        },
    });
});

export const updateQuest = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { quest, id } = Object.fromEntries(formData) as Record<string, string>;
    const questData = JSON.parse(quest);

    const { success, error, data } = questSchema.safeParse({ ...questData, scoreReward: parseInt(questData.scoreReward) });

    if (!success) {
        throw error;
    }

    const questFound = await prisma.quest.findUnique({
        where: {
            id,
        },
    });

    if (!questFound) {
        throw new Error('Quest not found');
    }

    return await prisma.quest.update({
        where: {
            id,
        },
        data: {
            ...data,
            title: data.title.trim(),
        },
    });
});

export const deleteQuest = wrapResponse(async (id: string) => {
    await isAuthanticated();

    return await prisma.quest.delete({
        where: {
            id,
        },
    });
});

export const validateQuest = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { questId, teamId } = Object.fromEntries(formData) as Record<string, string>;

    const quest = await prisma.quest.findUnique({
        where: {
            id: questId,
        },
    });

    if (!quest) {
        throw new Error('Quest not found');
    }

    const team = await prisma.betterteams_team.findUnique({
        where: {
            teamID: teamId,
        },
    });

    if (!team) {
        throw new Error('Team not found');
    }

    return await prisma.quest.update({
        where: {
            id: questId,
        },
        data: {
            teams: {
                connect: {
                    teamID: teamId,
                },
            },
        },
    });
});

export const unvalidateQuest = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { questId, teamId } = Object.fromEntries(formData) as Record<string, string>;

    const quest = await prisma.quest.findUnique({
        where: {
            id: questId,
        },
    });

    if (!quest) {
        throw new Error('Quest not found');
    }

    const team = await prisma.betterteams_team.findUnique({
        where: {
            teamID: teamId,
        },
    });

    if (!team) {
        throw new Error('Team not found');
    }

    return await prisma.quest.update({
        where: {
            id: questId,
        },
        data: {
            teams: {
                disconnect: {
                    teamID: teamId,
                },
            },
        },
    });
});
