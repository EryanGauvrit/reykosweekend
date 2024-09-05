import { z } from 'zod';

export const questSchema = z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2),
    eventId: z.string(),
    scoreReward: z.number(),
});
