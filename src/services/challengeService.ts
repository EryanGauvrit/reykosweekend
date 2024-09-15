'use server';

import prisma from '@/lib/prisma';
import { challengeRankingSchema, challengeSchema } from '@/lib/zod/challengeSchema';
import { Prisma } from '@prisma/client';
import { setScoreTeam } from './playerService';
import { wrapResponse } from './queryService';

export type ChallengeWithAllInclude = Prisma.ChallengeGetPayload<{
    include: {
        ranking: true;
    };
}>;

export const getChallenge = wrapResponse(async (id: string) => {
    return await prisma.challenge.findUnique({
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
    return await prisma.challenge.findMany({
        where: {
            eventId,
        },
        orderBy: {
            startDate: 'asc',
        },
        select: {
            id: true,
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
            scoreParticipation: true,
            rewardParticipation: true,
        },
    });
});

export const createChallenge = wrapResponse(async (formData: FormData) => {
    const { challenge } = Object.fromEntries(formData) as Record<string, string>;
    const challengeData = JSON.parse(challenge) as Record<string, string>;

    const { success, error, data } = challengeSchema.safeParse({
        ...challengeData,
        scoreRewardFirst: parseInt(challengeData.scoreRewardFirst),
        scoreRewardSecond: parseInt(challengeData.scoreRewardSecond),
        scoreRewardThird: parseInt(challengeData.scoreRewardThird),
        scoreParticipation: parseInt(challengeData.scoreParticipation),
        startDate: new Date(challengeData.startDate),
        dueDate: new Date(challengeData.dueDate),
    });

    if (!success) {
        throw error;
    }

    return await prisma.challenge.create({
        data,
    });
});

export const updateChallenge = wrapResponse(async (formData: FormData) => {
    const { id, challenge } = Object.fromEntries(formData) as Record<string, string>;
    const challengeData = JSON.parse(challenge) as Record<string, string>;

    const { success, error, data } = challengeSchema.safeParse({
        ...challengeData,
        scoreRewardFirst: parseInt(challengeData.scoreRewardFirst),
        scoreRewardSecond: parseInt(challengeData.scoreRewardSecond),
        scoreRewardThird: parseInt(challengeData.scoreRewardThird),
        scoreParticipation: parseInt(challengeData.scoreParticipation),
        startDate: new Date(challengeData.startDate),
        dueDate: new Date(challengeData.dueDate),
    });

    if (!success) {
        throw error;
    }

    const challengeFound = await prisma.challenge.findUnique({
        where: {
            id,
        },
    });

    if (!challengeFound) {
        throw new Error('Challenge not found');
    }

    return await prisma.challenge.update({
        where: {
            id,
        },
        data,
    });
});

export const deleteChallenge = wrapResponse(async (id: string) => {
    return await prisma.challenge.delete({
        where: {
            id,
        },
    });
});

/***** CHALLENGE RANKING *****/

export type ChallengeRanking = Prisma.ChallengeRankingGetPayload<{
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
    return await prisma.challengeRanking.findMany({
        where: {
            challengeId: challengeId,
        },
        orderBy: {
            rankPosition: 'asc',
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

const createChallengeRanking = wrapResponse(
    async ({ challengeId, teamId, rankPosition }: { challengeId: string; teamId: string; rankPosition: number }) => {
        const { success, error, data } = challengeRankingSchema.safeParse({ challengeId, teamId, rankPosition });

        if (!success) {
            throw error;
        }

        const challengeFound = await prisma.challenge.findUnique({
            where: {
                id: challengeId,
            },
            select: {
                scoreRewardFirst: true,
                scoreRewardSecond: true,
                scoreRewardThird: true,
                scoreParticipation: true,
            },
        });

        if (!challengeFound) {
            throw new Error('Challenge not found');
        }

        let score: number;
        switch (rankPosition) {
            case 1:
                score = challengeFound.scoreRewardFirst;
                break;
            case 2:
                score = challengeFound.scoreRewardSecond;
                break;
            case 3:
                score = challengeFound.scoreRewardThird;
                break;
            default:
                score = challengeFound.scoreParticipation;
                break;
        }

        await setScoreTeam(teamId, score);

        return await prisma.challengeRanking.create({
            data,
        });
    },
);

export const setChallengeRanking = wrapResponse(async (formData: FormData) => {
    const { teams, challengeId } = Object.fromEntries(formData) as Record<string, string>;
    const teamsList = JSON.parse(teams) as string[];

    const first = teamsList[0];
    const second = teamsList[1];
    const third = teamsList[2];

    await resetChallengeRanking(challengeId);

    await createChallengeRanking({ challengeId, teamId: first, rankPosition: 1 });
    await createChallengeRanking({ challengeId, teamId: second, rankPosition: 2 });
    await createChallengeRanking({ challengeId, teamId: third, rankPosition: 3 });

    teamsList.splice(0, 3);

    for (const teamId of teamsList) {
        await createChallengeRanking({ challengeId, teamId, rankPosition: 4 });
    }
});

const resetChallengeRanking = wrapResponse(async (challengeId: string) => {
    const challenge = await prisma.challenge.findUnique({
        where: {
            id: challengeId,
        },
    });

    if (!challenge) {
        throw new Error('Challenge not found');
    }

    const { scoreRewardFirst, scoreParticipation, scoreRewardSecond, scoreRewardThird } = challenge;

    const oldTeams = await prisma.challengeRanking.findMany({
        where: {
            challengeId,
        },
        orderBy: {
            rankPosition: 'asc',
        },
        select: {
            rankPosition: true,
            teamId: true,
        },
    });

    oldTeams.forEach(async (oldTeam) => {
        switch (oldTeam.rankPosition) {
            case 1:
                await setScoreTeam(oldTeam.teamId, -scoreRewardFirst);
                break;
            case 2:
                await setScoreTeam(oldTeam.teamId, -scoreRewardSecond);
                break;
            case 3:
                await setScoreTeam(oldTeam.teamId, -scoreRewardThird);
                break;
            default:
                await setScoreTeam(oldTeam.teamId, -scoreParticipation);
                break;
        }
    });

    await prisma.challengeRanking.deleteMany({
        where: {
            challengeId,
        },
    });
});
