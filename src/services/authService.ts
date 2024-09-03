'use server';

import prisma from '@/lib/prisma';
import { loginUserSchema } from '@/lib/zod/userSchema';
import { auth } from 'auth';
import bcrypt from 'bcryptjs';
import { AuthError, User } from 'next-auth';

export type LoginCredentials = {
    email: string;
    password: string;
};

export const login = async (credentials: LoginCredentials): Promise<User | null> => {
    const { success, data, error } = loginUserSchema.safeParse(credentials);
    if (!success) {
        console.error(error);
        throw new Error('Invalid data');
    }

    try {
        // get user from db
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                isAdmin: true,
                image: true,
                password: true,
                emailVerified: true,
            },
        });

        if (!user) {
            return null;
        }
        const validation = await bcrypt.compare(credentials.password as string, user.password as string);

        if (!validation) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        };
    } catch (error) {
        return null;
    }
};
export const isAuthanticated = async (): Promise<User> => {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthError('Unauthorized');
    }
    return session.user;
};

export const isAdmin = async (): Promise<boolean> => {
    const user = await isAuthanticated();
    const dbUser = await prisma.user.findUnique({
        where: {
            email: user.email as string,
        },
        select: {
            isAdmin: true,
        },
    });
    return dbUser?.isAdmin || false;
};
