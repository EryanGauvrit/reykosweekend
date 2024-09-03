'use client';

import AlertDialogComp from '@/components/basics/AlertDialog';
import Loader from '@/components/basics/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Youtube from '@/icons/Youtube';
import { IMAGE_SIZE } from '@/lib/utils';
import { OptionsFilesUrlClientSide, ResponseUploadFiles, uploadFile } from '@/services/fileService';
import { updateWebSiteSettings } from '@/services/webSiteSettingsService';
import { Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
    webSiteSettings?: {
        id: number;
        title: string;
        subtitle: string;
        description: string | null;
        imageDesktop: string | null;
        imageMobile: string | null;
        video: string | null;
    } | null;
};

export type Picture = {
    url: string;
    brutFile?: File | null;
};

const FormSetHomePage = ({ webSiteSettings }: Props) => {
    const defaultPicture1 = webSiteSettings?.imageDesktop?.split('#')[0] || '';
    const defaultPicture2 = webSiteSettings?.imageDesktop?.split('#')[1] || '';

    const defaultPicture1Phone = webSiteSettings?.imageMobile?.split('#')[0] || '';
    const defaultPicture2Phone = webSiteSettings?.imageMobile?.split('#')[1] || '';

    const { toast } = useToast();
    const router = useRouter();
    const [picture1, setPicture1] = useState<Picture | null>({
        url: defaultPicture1,
    });
    const [picture2, setPicture2] = useState<Picture | null>({
        url: defaultPicture2,
    });
    const [queryFormToSubmit, setQueryFormToSubmit] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPicture1Value = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            setPicture1(null);
            return;
        }
        const reader = new FileReader();

        reader.onloadend = () => {
            setPicture1({
                url: reader.result as string,
                brutFile: files[0] || null,
            });
        };

        reader.readAsDataURL(files[0]);
    };

    const getPicture2Value = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            setPicture2(null);
            return;
        }
        const reader = new FileReader();

        reader.onloadend = () => {
            setPicture2({
                url: reader.result as string,
                brutFile: files[0] || null,
            });
        };

        reader.readAsDataURL(files[0]);
    };

    const handleSubmit = async (formData: FormData) => {
        setQueryFormToSubmit(formData);
    };

    const handleUpdateHomePage = async () => {
        if (!queryFormToSubmit) return;
        setIsLoading(true);

        try {
            const urlPicture1 =
                picture1?.brutFile &&
                (await getFileUrls({
                    file: picture1.brutFile,
                    desktopSize: IMAGE_SIZE.homePage.desktop.width,
                    phoneSize: IMAGE_SIZE.homePage.phone.height,
                    fileName: 'homePagePicture1',
                    oldUrls: { desktop: defaultPicture1, phone: defaultPicture1Phone },
                }));

            const urlPicture2 =
                picture2?.brutFile &&
                (await getFileUrls({
                    file: picture2.brutFile,
                    desktopSize: IMAGE_SIZE.homePage.desktop.width,
                    phoneSize: IMAGE_SIZE.homePage.phone.height,
                    fileName: 'homePagePicture2',
                    oldUrls: { desktop: defaultPicture2, phone: defaultPicture2Phone },
                }));

            const imageDesktop = `${urlPicture1?.desktop || defaultPicture1}#${urlPicture2?.desktop || defaultPicture2}`;
            const imageMobile = `${urlPicture1?.phone || defaultPicture1Phone}#${urlPicture2?.phone || defaultPicture2Phone}`;

            queryFormToSubmit.append('imageDesktop', imageDesktop);
            queryFormToSubmit.append('imageMobile', imageMobile);

            const res = await updateWebSiteSettings(queryFormToSubmit);

            if (res.isErrored) {
                toast({ variant: res.variant, title: res.title, description: res.data });
                return;
            }

            toast({ variant: res.variant, title: 'Modification réussi', description: res.description });
            router.refresh();
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    const getFileUrls = async ({
        file,
        desktopSize,
        fileName,
        oldUrls,
        phoneSize,
    }: OptionsFilesUrlClientSide): Promise<ResponseUploadFiles | undefined> => {
        // const pictureCompressed = await getCompressedFiles({ file, desktopSize, phoneSize });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName || '');
        formData.append('oldUrls', JSON.stringify(oldUrls));
        formData.append('needPhone', 'true');
        const res = await uploadFile(formData);
        if (res.isErrored) {
            toast({ variant: res.variant, title: res.title, description: res.data });
            return;
        }

        return res.data as ResponseUploadFiles;
    };

    return (
        <form className="flex flex-col gap-4 my-7 max-w-4xl w-full pl-10" action={handleSubmit}>
            <Card className="flex flex-col justify-center p-10 gap-4 border-card bg-transparent border-2">
                <CardTitle className="mb-5 uppercase font-bold">Les textes globaux</CardTitle>
                <CardContent className="grid grid-cols-3 gap-3 place-items-center">
                    <Label className="w-full" htmlFor="title">
                        Titre *
                    </Label>
                    <Input
                        required
                        className="w-full col-span-2"
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={webSiteSettings?.title || ''}
                    />
                    <p className="text-sm col-span-3 place-self-start mb-5">
                        C'est le titre principal de votre site, il apparaît en haut de la page d'accueil, il est aussi utilisé lors d'une
                        envoie de mail automatique. Il doit être court et percutant car il est le premier élément que vos visiteurs verront
                        depuis les recherches du navigateur.
                    </p>
                    <p className="text-sm col-span-3 place-self-start mb-5">
                        Pour un titre sur deux lignes, vous pouvez utiliser: " : " pour le séparer. Exemple: "Mon titre : sous-titre"
                    </p>
                    <Label className="w-full" htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        className="w-full col-span-2"
                        id="description"
                        name="description"
                        defaultValue={webSiteSettings?.description || ''}
                    />
                    <p className="text-sm col-span-3 place-self-start mb-5">
                        La description est un texte plus long qui apparaît en dessous du titre. Il peut être utilisé pour décrire votre
                        activité, vos services, vos produits, etc. Attention à utiliser les bons mots clés et à rester cohérent pour le
                        référencement naturel.
                    </p>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-center p-10 gap-4 border-card bg-transparent border-2">
                <CardTitle className="mb-5 uppercase font-bold">Les images et vidéo</CardTitle>
                <CardContent className="grid grid-cols-3 gap-3 gap-y-10 place-items-center">
                    <div className="col-span-3 flex justify-center gap-24">
                        <Label className="cursor-pointer flex flex-col items-center gap-2" htmlFor="picture1">
                            <Avatar className="w-52 h-52 rounded-none">
                                <AvatarImage className="object-contain object-center" src={picture1?.url || ''} alt={`preview pricture`} />
                                <AvatarFallback>
                                    <ImageIcon size={100} />
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-muted text-center">Modifier la première image</p>
                        </Label>
                        <input hidden type="file" id="picture1" onChange={getPicture1Value} />

                        <Label className="cursor-pointer flex flex-col items-center gap-2" htmlFor="picture2">
                            <Avatar className="w-52 h-52 rounded-none">
                                <AvatarImage className="object-contain object-center" src={picture2?.url || ''} alt={`preview pricture`} />
                                <AvatarFallback>
                                    <ImageIcon size={100} />
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-muted text-center">Modifier la deuxième image</p>
                        </Label>
                        <input hidden type="file" id="picture2" onChange={getPicture2Value} />
                    </div>
                    <p className="text-sm col-span-3 place-self-start mb-5">
                        Les images doivent être centrées sur l'objectif et avoir une taille optimale de 1920x1080px
                    </p>
                    <Label className="w-full flex items-center gap-2 col-start-1" htmlFor="video">
                        <Youtube size={24} />
                        Lien du trailer Youtube
                    </Label>
                    <Input
                        className="w-full col-span-2 placeholder:text-muted"
                        type="text"
                        id="video"
                        name="video"
                        defaultValue={webSiteSettings?.video || ''}
                        placeholder="https://www.youtube.com/watch?v=videoId"
                    />
                </CardContent>
            </Card>

            <input hidden type="text" name="id" defaultValue={webSiteSettings?.id.toString()} />
            {isLoading && <Loader withoutPending />}

            <AlertDialogComp
                title="Modifier la page d'accueil"
                description="Êtes vous sûr de vouloir modifier la page d'accueil ?"
                closeLabel="Annuler"
                confirmLabel="Sauvegarder"
                openLabel="Sauvegarder"
                isSubmit
                confirmAction={handleUpdateHomePage}
                className="w-40 m-auto"
            />
        </form>
    );
};

export default FormSetHomePage;
