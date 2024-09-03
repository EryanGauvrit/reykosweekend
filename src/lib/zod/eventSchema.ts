import { z } from 'zod';

export const locationSchema = z.object({
    name: z.string().min(3),
});

export const categorySchema = z.object({
    name: z.string().min(3),
});

export const eventSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    image: z.string().url().optional(),
    ageMin: z.number().int().optional(),
    date: z.date().optional(),
    author: z.string().optional(),
    link: z.string().url().optional(),
    file: z.string().url().optional(),
    isShow: z.boolean(),
    categoryId: z.number().int({ message: 'Le champs catégorie est obligatoire' }),
});

export const plannifiedEventSchema = z.object({
    eventId: z.number().int(),
    locationId: z.number().int(),
    startDate: z.date(),
    endDate: z.date(),
});
