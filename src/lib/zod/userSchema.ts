import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email({
        message: 'Email is invalid',
    }),
    name: z.string(),
    username: z.string(),
    password: z.string().min(3, {
        message: 'Password must be at least 3 characters long',
    }),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional()
});

export const getUserByEmailSchema = z.object({
    email: z.string().email(),
});
