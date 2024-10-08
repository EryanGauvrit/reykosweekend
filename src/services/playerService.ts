'use server';

import prisma from '@/lib/prisma';
import { playerListSchema, playerSchema, teamRegisterSchema, teamSchema } from '@/lib/zod/playerSchema';
import { Prisma } from '@prisma/client';
import { isAuthanticated } from './authService';
import { wrapResponse } from './queryService';
import { sendNewRegistrationEmail } from './emailService';

/***** PLAYER *****/

export type PlayerWithAllInclude = Prisma.PlayerGetPayload<{
    include: {
        team: true;
        teamRegister: true;
    };
}>;

export const playerList = wrapResponse(async (formData: FormData) => {
    const { teamId, teamRegisterId } = Object.fromEntries(formData) as Record<string, string>;

    return await prisma.player.findMany({
        where: {
            OR: [{ teamId }, { teamRegisterId }],
        },
        include: {
            team: true,
            teamRegister: true,
        },
    });
});

export const createPlayer = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();
    const { player } = Object.fromEntries(formData) as Record<string, string>;
    const playerData = JSON.parse(player) as Record<string, string>;

    const { success, error, data } = playerSchema.safeParse({ ...playerData, email: playerData.email || null });

    if (!success) {
        throw error;
    }

    return await prisma.player.create({
        data,
    });
});

export const updatePlayer = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { id, player } = Object.fromEntries(formData) as Record<string, string>;
    const playerData = JSON.parse(player) as Record<string, string>;

    const { success, error, data } = playerSchema.safeParse({ ...playerData, email: playerData.email || null });

    if (!success) {
        throw error;
    }

    const playerFound = await prisma.player.findUnique({
        where: {
            id,
        },
    });

    if (!playerFound) {
        throw new Error('Player not found');
    }

    return await prisma.player.update({
        where: {
            id,
        },
        data,
    });
});

export const updateTeamPlayers = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { teamId, teamRegisterId } = Object.fromEntries(formData) as Record<string, string>;

    await prisma.player.updateMany({
        where: {
            teamRegisterId,
        },
        data: {
            teamId,
        },
    });

    return await prisma.teamRegister.delete({
        where: {
            id: teamRegisterId,
        },
    });
});

export const deletePlayer = wrapResponse(async (playerId: string) => {
    await isAuthanticated();

    return await prisma.player.delete({
        where: {
            id: playerId,
        },
    });
});

/***** TEAM REGISTER *****/

export type TeamRegisterWithAllInclude = Prisma.TeamRegisterGetPayload<{
    include: {
        players: true;
    };
}>;

export const getTeamRegisterListAll = wrapResponse(async () => {
    return await prisma.teamRegister.findMany({
        include: {
            players: {
                orderBy: {
                    isOwner: 'desc',
                },
            },
        },
    });
});

export const getTeamRegisterList = wrapResponse(async () => {
    return await prisma.teamRegister.findMany({
        select: {
            id: true,
            name: true,
        },
    });
});

export const createTeamRegister = wrapResponse(async (formData: FormData) => {
    const { team, players } = Object.fromEntries(formData) as Record<string, string>;
    const teamData = JSON.parse(team) as Record<string, string>;
    const playersArray = JSON.parse(players) as Record<string, string>[];

    const playerRes = playerListSchema.safeParse(playersArray.map((player) => ({ ...player, email: player.email || null })));

    const teamRes = teamRegisterSchema.safeParse(teamData);

    if (!playerRes.success) {
        throw playerRes.error;
    }

    if (!teamRes.success) {
        throw teamRes.error;
    }
    const emailTeamOwner = playerRes.data.find((player) => player.isOwner)?.email;

    if (!emailTeamOwner) {
        throw new Error('Team owner email not found');
    }

    await sendNewRegistrationEmail(emailTeamOwner, teamRes.data.registerContext);
    return await prisma.teamRegister.create({
        include: {
            players: true,
        },

        data: {
            ...teamRes.data,
            players: {
                create: playerRes.data,
            },
        },
    });
});

export const updateTeamRegister = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { team, id } = Object.fromEntries(formData) as Record<string, string>;

    const teamData = JSON.parse(team) as Record<string, string>;

    const { success, error, data } = teamRegisterSchema.safeParse(teamData);

    if (!success) {
        throw error;
    }

    const teamFound = await prisma.teamRegister.findUnique({
        where: {
            id,
        },
    });

    if (!teamFound) {
        throw new Error('Team not found');
    }

    return await prisma.teamRegister.update({
        where: {
            id,
        },
        data,
    });
});

export const deleteTeamRegister = wrapResponse(async (teamRegisterId: string) => {
    await isAuthanticated();

    return await prisma.teamRegister.delete({
        where: {
            id: teamRegisterId,
        },
    });
});

/***** TEAM *****/

export type TeamWithAllInclude = Prisma.Betterteams_teamGetPayload<{
    include: {
        players: true;
    };
    select: {
        teamID: true;
        name: true;
        players: {
            select: {
                id: true;
                nickname: true;
                minecraftNickname: true;
                isOwner: true;
            };
        };
        score: true;
        _count: {
            select: {
                quests: true;
            };
        };
    };
}>;

export type Team = Prisma.Betterteams_teamGetPayload<{
    select: {
        teamID: true;
        name: true;
    };
}>;

export const getTeamListAll = wrapResponse(async (eventId: string) => {
    return await prisma.betterteams_team.findMany({
        where: {
            eventId,
        },
        orderBy: {
            score: 'desc',
        },
        select: {
            teamID: true,
            name: true,
            players: {
                orderBy: {
                    isOwner: 'desc',
                },
                select: {
                    id: true,
                    nickname: true,
                    minecraftNickname: true,
                    isOwner: true,
                },
            },
            score: true,
            _count: {
                select: {
                    quests: true,
                },
            },
        },
    });
});

export const getTeamList = wrapResponse(async (eventId: string) => {
    return await prisma.betterteams_team.findMany({
        where: {
            eventId,
        },
        select: {
            teamID: true,
            name: true,
        },
    });
});

export const createTeam = wrapResponse(async (formData: FormData) => {
    await isAuthanticated();

    const { team } = Object.fromEntries(formData) as Record<string, string>;
    const teamData = JSON.parse(team) as Record<string, string>;

    const { success, error, data } = teamSchema.safeParse(teamData);

    if (!success) {
        throw error;
    }

    return await prisma.betterteams_team.create({
        data: {
            ...data,
            name: data.name.trim().replace(' ', '_'),
        },
    });
});

export const setScoreTeam = wrapResponse(async (teamId: string, score: number) => {
    await isAuthanticated();

    return await prisma.betterteams_team.update({
        where: {
            teamID: teamId,
        },
        data: {
            score: {
                increment: score,
            },
        },
    });
});

export const deleteTeam = wrapResponse(async (teamId: string) => {
    await isAuthanticated();

    return await prisma.betterteams_team.delete({
        where: {
            teamID: teamId,
        },
    });
});
