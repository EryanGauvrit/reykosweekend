import { z } from 'zod';

export const eventSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(5),
    startDate: z.date(),
    dueDate: z.date(),
});
