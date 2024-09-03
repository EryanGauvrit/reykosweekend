import { z } from 'zod';

export const collaboratorSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    image : z.string().optional(),
    youtube: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    website: z.string().url().optional(),
});
