'use server';

import { backendClient } from '@/lib/edgestore-server';
import { generateRandomName, IMAGE_SIZE } from '@/lib/utils';
import sharp from 'sharp';
import { isAuthanticated } from './authService';
import { wrapResponse } from './queryService';

enum ActionFile {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export type OptionsFileUrl = {
    formDataKey: string;
    formData?: FormData;
    fileUrl?: string;
    fileName?: string;
    oldUrl?: string;
};

type OldUrls = {
    desktop?: string;
    phone?: string;
};

export type OptionsFilesUrlClientSide = {
    file: File;
    fileName?: string;
    desktopSize?: number;
    phoneSize?: number;
    oldUrls?: OldUrls;
};

const setFile = async (action: ActionFile, file?: File, oldUrl?: string, fileName?: string) => {
    await isAuthanticated();
    if (action === ActionFile.DELETE) {
        throw new Error('Invalid action');
    }
    if (action === ActionFile.UPDATE && oldUrl && oldUrl !== 'A renseigner') {
        return await updateFileHandler(oldUrl, file, fileName);
    }
    return await uploadFileHandler(file, fileName);
};

export const deleteFile = wrapResponse(async (url: string) => {
    await isAuthanticated();
    return await deleteFileHandler(url);
});

const getFileUrl = wrapResponse(async (option: OptionsFileUrl) => {
    const blobFile = option.formData?.get(option.formDataKey) as File | undefined;

    const file = blobFile instanceof Blob && blobFile instanceof File ? blobFile : undefined;

    if ((!file || !file.name || !file.size || file.size === 0 || !file.type) && !option.fileUrl) {
        return null;
    }

    if (option.oldUrl && option.oldUrl !== 'A renseigner') {
        return await setFile(ActionFile.UPDATE, file, option.oldUrl, option.fileName);
    }
    return await setFile(ActionFile.CREATE, file, option.oldUrl, option.fileName);
});

const MIME_TYPES: Record<string, string> = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
};

const uploadFileHandler = async (file?: File, fileName?: string): Promise<string> => {
    if (!file || !MIME_TYPES[file.type]) {
        throw new Error('Invalid file type');
    }

    if (!fileName) {
        fileName = generateRandomName();
    } else {
        fileName = `${fileName.toLowerCase().replace(/ /g, '-')}_${Date.now()}`;
    }
    const blob = await backendClient.publicFiles.upload({
        content: {
            blob: new Blob([file], { type: file.type }),
            extension: MIME_TYPES[file.type],
        },
        options: {
            manualFileName: fileName,
        },
    });
    return blob.url;
};

const updateFileHandler = async (oldUrl: string, file?: File, fileName?: string): Promise<string> => {
    if (!file || !MIME_TYPES[file.type]) {
        throw new Error('Invalid file type');
    }

    if (!fileName) {
        fileName = generateRandomName();
    } else {
        fileName = `${fileName.toLowerCase().replace(/ /g, '-')}_${Date.now()}`;
    }

    const blob = await backendClient.publicFiles.upload({
        content: {
            blob: new Blob([file], { type: file.type }),
            extension: MIME_TYPES[file.type],
        },
        options: {
            replaceTargetUrl: oldUrl,
            manualFileName: fileName,
        },
    });

    return blob.url;
};

const deleteFileHandler = async (url: string): Promise<void> => {
    await backendClient.publicFiles.deleteFile({
        url,
    });
    return;
};

export type ResponseUploadFiles = {
    phone?: string;
    desktop: string;
};

const cropImage = async (file: File, width: number, height: number): Promise<any> => {
    const buffer = await file.arrayBuffer();
    const croppedBuffer = await sharp(Buffer.from(buffer))
        .resize(width, height, {
            fit: sharp.fit.cover,
            position: 'center',
        })
        .toBuffer();

    const resizedFile = new File([croppedBuffer], file.name, { type: file.type });

    return await compressImage(resizedFile, 80);
};

const compressImage = async (file: File, quality: number): Promise<File> => {
    const buffer = await file.arrayBuffer();
    const compressedBuffer = sharp(Buffer.from(buffer));
    switch (file.type) {
        case 'image/png':
            compressedBuffer.png({ quality });
            break;
        case 'image/jpeg':
            compressedBuffer.jpeg({ quality });
            break;
        case 'image/webp':
            compressedBuffer.webp({ quality });
            break;
        default:
            throw new Error('Invalid file type');
    }

    return new File([await compressedBuffer.toBuffer()], file.name, { type: file.type });
};

export const uploadFile = wrapResponse(async (formData: FormData): Promise<ResponseUploadFiles> => {
    const fileName = formData.get('fileName') as string;
    const oldUrlsBrut = formData.get('oldUrls') as string;
    const file = formData.get('file') as File;
    const needPhone = formData.get('needPhone') as string;
    const desktopWith = formData.get('desktopWith') ? parseInt(formData.get('desktopWith') as string) : IMAGE_SIZE.homePage.desktop.width;
    const desktopHeight = formData.get('desktopHeight')
        ? parseInt(formData.get('desktopHeight') as string)
        : IMAGE_SIZE.homePage.desktop.height;
    const phoneWith = formData.get('phoneWith') ? parseInt(formData.get('phoneWith') as string) : IMAGE_SIZE.homePage.phone.width;
    const phoneHeight = formData.get('phoneHeight') ? parseInt(formData.get('phoneHeight') as string) : IMAGE_SIZE.homePage.phone.height;

    const fileDesktop = await cropImage(file, desktopWith, desktopHeight);
    const filePhone = await cropImage(file, phoneWith, phoneHeight);

    const oldUrls = oldUrlsBrut ? JSON.parse(oldUrlsBrut) : undefined;

    const key = fileName || generateRandomName();

    const formDataDesktop = new FormData();
    formDataDesktop.append(key + 'D', fileDesktop);

    const formDataPhone = new FormData();
    needPhone && formDataPhone.append(key + 'P', filePhone);

    const urlDesktop = await getFileUrl({
        formDataKey: key + 'D',
        formData: formDataDesktop,
        oldUrl: oldUrls?.desktop,
        fileName: key + '_desktop ',
    });

    const urlPhone = needPhone
        ? await getFileUrl({
              formDataKey: key + 'P',
              formData: formDataPhone,
              oldUrl: oldUrls?.phone,
              fileName: key + '_phone ',
          })
        : { isErrored: false, data: null };

    if (urlDesktop.isErrored || urlPhone.isErrored) {
        throw new Error('Error while uploading file');
    }

    return {
        phone: urlPhone.data,
        desktop: urlDesktop.data,
    };
});

export const uploadPDFFile = wrapResponse(async (formData: FormData): Promise<ResponseUploadFiles> => {
    const fileName = formData.get('fileName') as string;
    const oldUrl = formData.get('oldUrl') as string;
    const file = formData.get('file') as File;

    const key = fileName || generateRandomName();

    const formDataPDF = new FormData();
    formDataPDF.append(key + 'PDF', file);

    const { isErrored, data } = await getFileUrl({
        formDataKey: key + 'PDF',
        formData: formDataPDF,
        oldUrl,
        fileName: key + '_',
    });

    if (isErrored) {
        throw new Error('Error while uploading file');
    }
    return data;
});
