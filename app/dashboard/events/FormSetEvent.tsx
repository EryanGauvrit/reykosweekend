'use client';

import DialogForm from '@/components/basics/DialogForm';
import SelectFromDB from '@/components/basics/SelectFromDB';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { createEvent, EventWithCategory, updateEvent } from '@/services/eventService';
import { OptionsFilesUrlClientSide, uploadFile, uploadPDFFile } from '@/services/fileService';
import { Image as ImageIcon, Settings, SquarePlus } from 'lucide-react';
import { useState } from 'react';
import { Picture } from '../set-homepage/FormSetHomePage';
import { IMAGE_SIZE } from '@/lib/utils';

const FormSetEvent = ({ event }: { event?: EventWithCategory }) => {
    const defaultImage = event?.image || '';
    const [image, setImage] = useState<Picture | undefined>({
        url: defaultImage,
    });
    const { toast } = useToast();

    const getImageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = e.target?.result;
                setImage({
                    url: image as string,
                    brutFile: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const getFileUrl = async ({ file, fileName, oldUrls }: OptionsFilesUrlClientSide): Promise<string | undefined> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName || '');
        formData.append('oldUrls', JSON.stringify(oldUrls));
        formData.append('desktopWith', IMAGE_SIZE.event.desktop.width.toString());
        formData.append('desktopHeight', IMAGE_SIZE.event.desktop.height.toString());
        const res = await uploadFile(formData);
        if (res.isErrored) {
            toast({ variant: res.variant, title: res.title, description: res.data });
            return;
        }

        return res.data.desktop || '';
    };

    const getPDFUrl = async (file: File, fileName: string, oldUrl?: string | null): Promise<string | undefined> => {
        const pdfFormData = new FormData();
        pdfFormData.append('file', file);
        pdfFormData.append('fileName', fileName);
        pdfFormData.append('oldUrl', oldUrl || '');

        const res = await uploadPDFFile(pdfFormData);
        if (res.isErrored) {
            toast({ variant: res.variant, title: res.title, description: res.data });
            return;
        }
        return res.data as string;
    };

    if (event) {
        return (
            <DialogForm
                title="Modifier un évènement"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations de l'évènement à modifier."
                actionFn={async (formData) => {
                    const title = formData.get('title') as string;
                    const pdfFile = formData.get('pdf') as File | undefined;

                    const pdfUrl = pdfFile && (await getPDFUrl(pdfFile, `event-${title}`, event.file));
                    const imageUrl =
                        image?.brutFile &&
                        (await getFileUrl({
                            file: image.brutFile,
                            desktopSize: 800,
                            fileName: `event-${title}`,
                            oldUrls: {
                                desktop: defaultImage,
                            },
                        }));
                    imageUrl && formData.append('image', imageUrl);
                    pdfUrl && formData.append('file', pdfUrl);
                    return await updateEvent(formData);
                }}
                className="max-w-2xl max-h-[900px] overflow-auto"
                size="icon"
                classNameTrigger="w-8 h-8"
                variant="warning"
            >
                <FormContent event={event} image={image} onImageChange={getImageValue} />
                <input type="hidden" name="id" value={event.id.toString()} />
            </DialogForm>
        );
    }

    return (
        <DialogForm
            title="Ajouter un évènement"
            textOpen={<SquarePlus size={26} />}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations de l'évènement à ajouter."
            actionFn={async (formData) => {
                const title = formData.get('title') as string;
                const pdfFile = formData.get('pdf') as File | undefined;

                const pdfUrl = pdfFile && (await getPDFUrl(pdfFile, `event-${title}`));
                const imageUrl =
                    image?.brutFile &&
                    (await getFileUrl({
                        file: image.brutFile,
                        fileName: `event-${title}`,
                        oldUrls: {
                            desktop: defaultImage,
                        },
                    }));
                imageUrl && formData.append('image', imageUrl);
                pdfUrl && formData.append('file', pdfUrl);
                return await createEvent(formData);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="icon"
            variant="ghost"
        >
            <FormContent image={image} onImageChange={getImageValue} />
        </DialogForm>
    );
};

export default FormSetEvent;

const FormContent = ({
    event,
    image,
    onImageChange,
}: {
    event?: EventWithCategory;
    image?: Picture;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const [defaultPdf, setDefaultPdf] = useState<string | undefined | null>(event?.file?.split('/').pop());
    const onPdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDefaultPdf(file.name);
        }
    };
    return (
        <>
            <Label className="cursor-pointer flex flex-col items-center gap-2" htmlFor="image">
                <Avatar className="w-52 h-52 rounded-none">
                    <AvatarImage className="object-contain object-center" src={image?.url || ''} alt={`preview pricture`} />
                    <AvatarFallback>
                        <ImageIcon size={100} />
                    </AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted text-center">Modifier l'affiche</p>
                <p className="text-sm text-muted text-center">
                    Taille idéale: {IMAGE_SIZE.event.desktop.width}x{IMAGE_SIZE.event.desktop.height}px
                </p>
            </Label>
            <input hidden type="file" id="image" name="name" onChange={onImageChange} />
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="title">Titre*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="title"
                        type="text"
                        placeholder="Titre"
                        name="title"
                        defaultValue={event?.title}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="author">Auteur</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="author"
                        type="text"
                        placeholder="Jean Luc"
                        name="author"
                        defaultValue={event?.author || ''}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="ageMin">Age</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="ageMin"
                        type="number"
                        min={0}
                        placeholder="18"
                        name="ageMin"
                        defaultValue={event?.ageMin || ''}
                    />
                </div>

                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="link">Lien vers la boutique de billets</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="link"
                        type="text"
                        placeholder="https://lien.com"
                        name="link"
                        defaultValue={event?.link || ''}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="link">C'est un spectacle ?</Label>
                <Checkbox id="isShow" name="isShow" className="text-accent w-5 h-5" defaultChecked={event?.isShow} />
            </div>
            <div className="grid grid-cols-2 gap-2 items-start">
                <div className="grid gap-2">
                    <Label htmlFor="category">Catégorie*</Label>
                    <SelectFromDB
                        selectLabel="Catégorie"
                        model="category"
                        required
                        id="category"
                        placeholder="Sélectionner une catégorie"
                        name="categoryId"
                        defaultValue={event?.category.id.toString()}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="pdf">Dossier du spectacle (.pdf)</Label>
                    <Input className="placeholder:text-accent" id="pdf" type="file" name="pdf" onChange={onPdfChange} />
                    <p className="text-sm text-muted">Fichier PDF: {defaultPdf}</p>
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                    className="placeholder:text-accent"
                    required
                    id="description"
                    placeholder="Description"
                    name="description"
                    defaultValue={event?.description}
                />
            </div>
        </>
    );
};
