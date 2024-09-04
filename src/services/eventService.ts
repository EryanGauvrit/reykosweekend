'use server';

import prisma from '@/lib/prisma';
import { compareDate } from '@/lib/utils';
import { eventSchema } from '@/lib/zod/eventSchema';
import { Prisma } from '@prisma/client';
import { isAuthanticated } from './authService';
import { wrapResponse } from './queryService';

/**** EVENT  ****/

export type EventWithAllInclude = Prisma.EventGetPayload<{
    include: {
        EventInGame: true;
        Quests: true;
        players: true;
        teamRegisters: true;
        teams: true;
    };
}>;

export type EventWithEventsInGame = Prisma.EventGetPayload<{
    include: {
        EventInGame: true;
        Quests: true;
    };
}>;

export type EventWithTeams = Prisma.EventGetPayload<{
    include: {
        players: true;
        teams: true;
    };
}>;

export type EventWithRegistration = Prisma.EventGetPayload<{
    include: {
        players: true;
        teamRegisters: true;
    };
}>;

export const nextEvent = wrapResponse(async () => {
    return await prisma.event.findFirst({
        where: {
            startDate: {
                gte: new Date(),
            },
        },
        orderBy: {
            startDate: 'desc',
        },
    });
});

export const eventList = wrapResponse(async () => {
    return await prisma.event.findMany({
        orderBy: {
            startDate: 'desc',
        },
    });
});

export const createEvent = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    const res = Object.fromEntries(formData) as Record<string, string>;

    const formZod = {
        ...res,
        startDate: new Date(res.startDate),
        dueDate: new Date(res.dueDate),
    };

    const { success, error, data } = eventSchema.safeParse(formZod);
    if (!success) {
        throw error;
    }

    return await prisma.event.create({
        data,
    });
});

export const updateEvent = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const id = formData.get('id') as string;
    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;
        const date = compareDate(res.startDate, res.dueDate || res.startDate);
        return {
            ...res,
            startDate: date.startDate,
            dueDate: date.endDate,
        };
    };
    const formZod = getFormZod();

    const { success, error, data } = eventSchema.safeParse(formZod);
    if (!success) {
        throw error;
    }

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
    });

    if (!event) {
        throw new Error('Event not found');
    }

    return await prisma.event.update({
        where: {
            id,
        },
        data,
    });
});

export const deleteEvent = wrapResponse(async (id: string) => {
    await isAuthanticated();

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
    });

    if (!event) {
        throw new Error('Event not found');
    }

    return await prisma.event.delete({
        where: {
            id,
        },
    });
});
