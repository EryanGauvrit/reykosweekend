import { z } from 'zod';

export const challengeSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(5),
    startDate: z.date(),
    dueDate: z.date(),
    eventId: z.string(),
    scoreRewardFirst: z.number(),
    scoreRewardSecond: z.number(),
    scoreRewardThird: z.number(),
    rewardFirst: z.string(),
    rewardSecond: z.string(),
    rewardThird: z.string(),
});

export const challengeRankingSchema = z.object({
    teamId: z.string(),
    rankPosition: z.number(),
    eventInGameId: z.string(),
});
