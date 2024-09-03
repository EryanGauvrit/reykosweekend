import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export type PictureToDisplay = {
    url?: string;
    size: {
        width: number;
        height: number;
    };
};

export const SCREEN_SIZE = {
    phone: 768,
    desktop: 1920,
};

export const IMAGE_SIZE = {
    homePage: {
        phone: { width: 768, height: 812 },
        desktop: { width: 1920, height: 1080 },
    },
    collaborator: {
        phone: { width: 220, height: 240 },
        desktop: { width: 270, height: 295 },
    },
    event: {
        phone: { width: 290, height: 190 },
        desktop: { width: 480, height: 320 },
    },
};

export const isPhoneScreen = () => {
    return window.innerWidth <= SCREEN_SIZE.phone;
};

export const getPicture = (phone: PictureToDisplay, desktop: PictureToDisplay) => {
    return isPhoneScreen() ? phone : desktop;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const compareDate = (date1: string, date2: string) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    if (startDate > endDate) {
        throw new Error('La date de fin doit être supérieure ou égale à la date de début');
    }

    return {
        startDate,
        endDate,
    };
};

export const generateRandomName = () => {
    return Math.random().toString(36).substring(2, 15) + Date.now();
};

export const nullToUndefined = (value: any) => {
    return value === null ? undefined : value;
};

export const getFileType = (name?: string) => {
    if (!name) return undefined;
    return name.split('.').pop();
};

export const getEmbedId = (url?: string) => {
    return url?.split('watch?v=')[1] || '';
};

export const formatDate = (date: Date, formatStr = 'PP') => {
    return format(date, formatStr, {
        locale: fr,
    });
};

export const formatStartEndDate = (startDate: Date, endDate: Date, formatStr?: string) => {
    if (format(startDate, 'dd/MMMM/yyyy') === format(endDate, 'dd/MMMM/yyyy')) {
        return `Le ${formatDate(startDate, formatStr || 'dd MMMM yyyy')}`;
    }
    return `Du ${formatDate(startDate, formatStr || 'dd')} au ${formatDate(endDate, formatStr || 'dd MMMM yyyy')}`;
};
