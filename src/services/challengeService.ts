'use server';

import prisma from '@/lib/prisma';
import { challengeRankingSchema, challengeSchema } from '@/lib/zod/challengeSchema';
import { Prisma } from '@prisma/client';
import { setScoreTeam } from './playerService';
import { wrapResponse } from './queryService';

export type ChallengeWithAllInclude = Prisma.EventInGameGetPayload<{
    include: {
        ranking: true;
    };
}>;

export const getChallenge = wrapResponse(async (id: string) => {
    return await prisma.eventInGame.findUnique({
        where: {
            id,
        },
        select: {
            description: true,
            dueDate: true,
            ranking: true,
            rewardFirst: true,
            rewardSecond: true,
            rewardThird: true,
            scoreRewardFirst: true,
            scoreRewardSecond: true,
            scoreRewardThird: true,
            startDate: true,
            title: true,
        },
    });
});

export const getChallengeList = wrapResponse(async (eventId: string) => {
    return await prisma.eventInGame.findMany({
        where: {
            eventId,
        },
        select: {
            description: true,
            dueDate: true,
            rewardFirst: true,
            rewardSecond: true,
            rewardThird: true,
            scoreRewardFirst: true,
            scoreRewardSecond: true,
            scoreRewardThird: true,
            startDate: true,
            title: true,
        },
    });
});

export const createChallenge = wrapResponse(async (formData: FormData) => {
    const { challenge } = Object.fromEntries(formData) as Record<string, string>;
    const challengeData = JSON.parse(challenge) as Record<string, string>;

    const { success, error, data } = challengeSchema.safeParse(challengeData);

    if (!success) {
        throw error;
    }

    return await prisma.eventInGame.create({
        data,
    });
});

export const updateChallenge = wrapResponse(async (formData: FormData) => {
    const { id, challenge } = Object.fromEntries(formData) as Record<string, string>;
    const challengeData = JSON.parse(challenge) as Record<string, string>;

    const { success, error, data } = challengeSchema.safeParse(challengeData);

    if (!success) {
        throw error;
    }

    const challengeFound = await prisma.eventInGame.findUnique({
        where: {
            id,
        },
    });

    if (!challengeFound) {
        throw new Error('Challenge not found');
    }

    return await prisma.eventInGame.update({
        where: {
            id,
        },
        data,
    });
});

export const deleteChallenge = wrapResponse(async (id: string) => {
    return await prisma.eventInGame.delete({
        where: {
            id,
        },
    });
});

/***** CHALLENGE RANKING *****/

export type ChallengeRanking = Prisma.EventGameRankingGetPayload<{
    select: {
        rankPosition: true;
        team: {
            select: {
                name: true;
            };
        };
    };
}>;

export const getChallengeRanking = wrapResponse(async (challengeId: string) => {
    return await prisma.eventGameRanking.findMany({
        where: {
            eventInGameId: challengeId,
        },
        orderBy: {
            rankPosition: 'desc',
        },
        select: {
            rankPosition: true,
            team: {
                select: {
                    name: true,
                },
            },
        },
    });
});

export const createChallengeRanking = wrapResponse(async (formData: FormData) => {
    const { challengeId, teamId, rankPosition } = Object.fromEntries(formData) as Record<string, string>;

    const { success, error, data } = challengeRankingSchema.safeParse({ eventInGameId: challengeId, teamId, rankPosition });

    if (!success) {
        throw error;
    }

    const challengeFound = await prisma.eventInGame.findUnique({
        where: {
            id: challengeId,
        },
        select: {
            scoreRewardFirst: true,
            scoreRewardSecond: true,
            scoreRewardThird: true,
        },
    });

    if (!challengeFound) {
        throw new Error('Challenge not found');
    }

    let score = challengeFound.scoreRewardThird / 2;
    switch (parseInt(rankPosition)) {
        case 1:
            score = challengeFound.scoreRewardFirst;
            break;
        case 2:
            score = challengeFound.scoreRewardSecond;
            break;
        case 3:
            score = challengeFound.scoreRewardThird;
            break;
    }

    await setScoreTeam(teamId, score);

    return await prisma.eventGameRanking.create({
        data,
    });
});

// export const updateChallengeRanking = wrapResponse(async (formData: FormData) => {
//     const { id, challengeId, teamId, rankPosition } = Object.fromEntries(formData) as Record<string, string>;

//     const { success, error, data } = challengeRankingSchema.safeParse({ eventInGameId: challengeId, teamId, rankPosition });

//     if (!success) {
//         throw error;
//     }

//     const challengeRankingFound = await prisma.eventGameRanking.findUnique({
//         where: {
//             id,
//         },
//     });

//     if (!challengeRankingFound) {
//         throw new Error('Challenge ranking not found');
//     }

//     return await prisma.eventGameRanking.update({
//         where: {
//             id,
//         },
//         data,
//     });
// });

export const deleteChallengeRanking = wrapResponse(async (id: string) => {
    return await prisma.eventGameRanking.delete({
        where: {
            id,
        },
    });
});
