import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { Variant } from '../types/props/variant';
import { AuthError } from 'next-auth';

export type encType = 'application/json' | 'multipart/form-data';

export type Query = {
    method: string;
    body?: BodyInit | FormData;
    headers?: HeadersInit;
    authorization?: string;
    encType?: encType;
};

export type QueryResponse = {
    data: any;
    isErrored: boolean;
    title?: string;
    variant: Variant;
    description?: string;
    code?: number;
};

export const wrapResponse = <T extends (...args: any[]) => Promise<any>>(actionFn: T) => {
    return async (...args: Parameters<T>): Promise<QueryResponse> => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const res = await actionFn(...args);
            return {
                data: res,
                isErrored: false,
                variant: 'success',
                title: 'Succès',
                code: 200,
            };
        } catch (err: any) {
            console.error(err);
            if (err instanceof ZodError) {
                return {
                    data: err.message,
                    isErrored: true,
                    variant: 'destructive',
                    title: 'Erreur 400',
                };
            }
            if (err instanceof AuthError) {
                return {
                    data: err.message,
                    isErrored: true,
                    variant: 'destructive',
                    title: `Erreur 401`,
                };
            }
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    return {
                        data: 'Item déjà existant',
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur 400',
                    };
                }
                if (err.code === 'P2003') {
                    return {
                        data: 'Des événements sont associés à cette catégorie',
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur 401',
                    };
                }
                return {
                    data: 'Erreur interne du serveur',
                    isErrored: true,
                    variant: 'destructive',
                    title: 'Erreur 500',
                };
            }
            if (err instanceof Error) {
                return {
                    data: err.message,
                    isErrored: true,
                    variant: 'destructive',
                    title: 'Erreur 500',
                };
            }
            return {
                data: `${JSON.stringify(err)}`,
                isErrored: true,
                variant: 'destructive',
                title: 'Erreur 500',
            };
        }
    };
};
