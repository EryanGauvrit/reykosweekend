import { z } from 'zod';

export const streamerSchema = z.object({
    name: z.string(),
    twitch: z.string().url(),
    youtube: z.string().url().optional(),
    instagram: z.string().url().optional(),
    discord: z.string().url().optional(),
    website: z.string().url().optional(),
});
