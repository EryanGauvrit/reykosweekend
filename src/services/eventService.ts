'use server';

import prisma from '@/lib/prisma';
import { compareDate } from '@/lib/utils';
import { categorySchema, eventSchema, locationSchema, plannifiedEventSchema } from '@/lib/zod/eventSchema';
import { Prisma } from '@prisma/client';
import { isAuthanticated } from './authService';
import { deleteFile } from './fileService';
import { wrapResponse } from './queryService';

/**** EVENT  ****/

export type EventWithCategory = Prisma.EventGetPayload<{
    include: {
        category: true;
    };
}>;

export const eventList = wrapResponse(async () => {
    return await prisma.event.findMany({
        orderBy: {
            updatedAt: 'desc',
        },
        include: {
            category: true,
        },
    });
});

export const createEvent = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;
        if (!res.categoryId) {
            throw new Error('Le champs catégorie est obligatoire');
        }

        return {
            ...res,
            link: res.link ? res.link : undefined,
            ageMin: res.ageMin ? parseInt(res.ageMin) : undefined,
            isShow: res.isShow === 'on',
            categoryId: parseInt(res.categoryId),
            date: res.date ? new Date(res.date) : undefined,
        };
    };
    const formZod = getFormZod();

    const { success, error, data } = eventSchema.safeParse(formZod);
    if (!success) {
        throw error;
    }

    return await prisma.event.create({
        data: {
            ...data,
            link: data.link ? data.link : '',
            ageMin: data.ageMin ? data.ageMin : null,
            date: data.date ? data.date : null,
            file: data.file ? data.file : '',
        },
    });
});

export const updateEvent = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const id = parseInt(formData.get('id') as string);
    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;

        return {
            ...res,
            link: res.link ? res.link : undefined,
            ageMin: res.ageMin ? parseInt(res.ageMin) : undefined,
            isShow: res.isShow === 'on',
            categoryId: parseInt(res.categoryId),
            date: res.date ? new Date(res.date) : undefined,
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
        data: {
            ...data,
            link: data.link ? data.link : '',
            ageMin: data.ageMin ? data.ageMin : null,
            image: data.image ? data.image : '',
            date: data.date ? data.date : null,
        },
    });
});

export const deleteEvent = wrapResponse(async (id: number) => {
    await isAuthanticated();

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
    });

    if (!event) {
        throw new Error('Event not found');
    }

    event.file && (await deleteFile(event.file));
    event.image && (await deleteFile(event.image));
    return await prisma.event.delete({
        where: {
            id,
        },
    });
});

/**** LOCATION  ****/

export const locationList = wrapResponse(async () => {
    return await prisma.location.findMany({
        orderBy: {
            updatedAt: 'desc',
        },
    });
});

export const createLocation = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    const { success, error, data } = locationSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        throw error;
    }

    return await prisma.location.create({
        data,
    });
});

export const deleteLocation = wrapResponse(async (id: number) => {
    await isAuthanticated();
    return await prisma.location.delete({
        where: {
            id,
        },
    });
});

/**** CATEGORY  ****/

export const categoryList = wrapResponse(async () => {
    return await prisma.category.findMany({
        orderBy: {
            updatedAt: 'desc',
        },
    });
});

export const createCategory = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    const { success, error, data } = categorySchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        throw error;
    }

    return await prisma.category.create({
        data,
    });
});

export const deleteCategory = wrapResponse(async (id: number) => {
    await isAuthanticated();
    return await prisma.category.delete({
        where: {
            id,
        },
    });
});

/**** PLANNIFIED EVENT  ****/

export type PlannifiedEventWithInclude = Prisma.PlannifiedEventGetPayload<{
    include: {
        // event: true;
        location: true;
        event: {
            include: {
                category: true;
            };
        };
    };
}>;

export const plannifiedEventList = wrapResponse(async () => {
    return await prisma.plannifiedEvent.findMany({
        orderBy: {
            startDate: 'desc',
        },
        include: {
            event: true,
            location: true,
        },
    });
});

export const createPlannifiedEvent = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;

        const startDate = res.startDate;

        const date = compareDate(startDate, res.endDate || startDate);

        return {
            ...res,
            eventId: parseInt(res.eventId),
            locationId: parseInt(res.locationId),
            startDate: date.startDate,
            endDate: date.endDate,
        };
    };
    const formZod = getFormZod();

    const { success, error, data } = plannifiedEventSchema.safeParse(formZod);
    if (!success) {
        throw error;
    }

    return await prisma.plannifiedEvent.create({
        data,
    });
});

export const updatePlannifiedEvent = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const id = parseInt(formData.get('id') as string);
    const getFormZod = () => {
        const res = Object.fromEntries(formData) as Record<string, string>;

        const startDate = res.startDate;
        const date = compareDate(startDate, res.endDate || startDate);

        return {
            ...res,
            eventId: parseInt(res.eventId),
            locationId: parseInt(res.locationId),
            startDate: date.startDate,
            endDate: date.endDate,
        };
    };
    const formZod = getFormZod();

    const { success, error, data } = plannifiedEventSchema.safeParse(formZod);
    if (!success) {
        throw error;
    }

    const plannifiedEvent = await prisma.plannifiedEvent.findUnique({
        where: {
            id,
        },
    });

    if (!plannifiedEvent) {
        throw new Error('PlannifiedEvent not found');
    }

    return await prisma.plannifiedEvent.update({
        where: {
            id,
        },
        data,
    });
});

export const deletePlannifiedEvent = wrapResponse(async (id: number) => {
    await isAuthanticated();
    return await prisma.plannifiedEvent.delete({
        where: {
            id,
        },
    });
});
