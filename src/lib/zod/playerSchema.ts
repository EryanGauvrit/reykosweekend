import { z } from 'zod';

export const playerSchema = z.object({
    nickname: z.string().min(2).max(255),
    minecraftNickname: z.string().min(2).max(255),
    email: z.string().email().optional().nullable(),
    isOwner: z.boolean(),
    eventId: z.string(),
    teamRegisterId: z.string().optional(),
    teamId: z.string().optional(),
});

export const playerUpdateSchema = z.object({
    ...playerSchema.shape,
    id: z.string(),
});

export const updatePlayerListSchema = z.array(playerUpdateSchema);

export const playerListSchema = z.array(playerSchema);

export const teamRegisterSchema = z.object({
    name: z.string().min(2).max(255),
    registerContext: z.string().min(2),
    eventId: z.string(),
});

export const teamSchema = z.object({
    name: z.string().min(2).max(255),
    eventId: z.string(),
});

export const setScoreTeamSchema = z.object({
    teamId: z.string(),
    score: z.number(),
});
