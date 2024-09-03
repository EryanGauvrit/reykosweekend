'use server';
import prisma from '@/lib/prisma';
import { createUserSchema, getUserByEmailSchema, updateUserSchema } from '@/lib/zod/userSchema';
import { signIn } from 'auth';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { isAuthanticated } from './authService';
import { wrapResponse } from './queryService';

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND || ''));
};

export const createUser = wrapResponse(async (body: FormData) => {
    const count = await countUser();
    const { success, data, error } = createUserSchema.safeParse(Object.fromEntries(body));
    if (!success || count.isErrored) {
        throw error;
    }

    let isAdmin = false;

    if (count.data === 0) {
        isAdmin = true;
    } else {
        await isAuthanticated();
    }

    const user = await prisma.user.create({
        data: { ...data, password: await hashPassword(data.password), isAdmin },
    });

    return user;
});

export const getUserByEmail = wrapResponse(async (email: string) => {
    const user = await isAuthanticated();
    const { success, error, data } = getUserByEmailSchema.safeParse({ email });

    if (!success) {
        throw error;
    }
    if (user.email !== data.email) {
        throw new AuthError('Unauthorized');
    }
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
});

export const updateUser = wrapResponse(async (body: FormData, email: string) => {
    const user = await isAuthanticated();
    const safeEmail = getUserByEmailSchema.safeParse({ email });
    const { success, error, data } = updateUserSchema.safeParse(Object.fromEntries(body));

    if (!success || !safeEmail.success) {
        throw error;
    }
    if (user.email !== safeEmail.data.email) {
        throw new AuthError('Unauthorized');
    }

    return await prisma.user.update({
        where: {
            email,
        },
        data: { ...data, password: data.password ? await hashPassword(data.password) : undefined },
    });
});

export const deleteUser = wrapResponse(async (id: string) => {
    const userAuth = await isAuthanticated();

    if (!userAuth || !userAuth.email) {
        throw new AuthError('Unauthorized');
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userAuth.email,
        },
    });
    if (!user || !user.isAdmin) {
        throw new AuthError('Unauthorized');
    }

    await prisma.user.delete({
        where: {
            id,
        },
    });
});

export const countUser = wrapResponse(async () => {
    return await prisma.user.count();
});

export const createUserAndSendMail = wrapResponse(async (formData: FormData) => {
    const password = Math.random().toString(36).slice(-8);
    formData.append('password', password);
    const res = await createUser(formData);

    if (!res.isErrored) {
        return await signIn('resend', {
            email: res.data.email,
            passwordTemp: password,
            redirect: false,
        });
    }

    throw new Error("L'utilisateur n'a pas pu être créé");
});
