'use client';

import DialogForm from '@/components/basics/DialogForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import FaceBook from '@/icons/FaceBook';
import Instagram from '@/icons/Instagram';
import Linkedin from '@/icons/Linkedin';
import { WebSite } from '@/icons/WebSite';
import Youtube from '@/icons/Youtube';
import { IMAGE_SIZE } from '@/lib/utils';
import { createCollaborator, updateCollaborator } from '@/services/collaboratorService';
import { OptionsFilesUrlClientSide, uploadFile } from '@/services/fileService';
import { Collaborator } from '@prisma/client';
import { ImageIcon, Settings } from 'lucide-react';
import { useState } from 'react';
import { Picture } from '../set-homepage/FormSetHomePage';

const FormSetCollaborator = ({ collaborator }: { collaborator?: Collaborator }) => {
    const defaultImage = collaborator?.image || '';
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

    const getFileUrl = async ({
        file,
        desktopSize,
        fileName,
        oldUrls,
        phoneSize,
    }: OptionsFilesUrlClientSide): Promise<string | undefined> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName || '');
        formData.append('oldUrls', JSON.stringify(oldUrls));
        formData.append('desktopWith', IMAGE_SIZE.collaborator.desktop.width.toString());
        formData.append('desktopHeight', IMAGE_SIZE.collaborator.desktop.height.toString());
        const res = await uploadFile(formData);
        if (res.isErrored) {
            toast({ variant: res.variant, title: res.title, description: res.data });
            return;
        }

        return res.data.desktop || '';
    };

    if (collaborator) {
        return (
            <DialogForm
                title="Modifier un collaborateur"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations du collaborateur à modifier."
                className="max-w-2xl"
                actionFn={async (formData) => {
                    const title = `${formData.get('firstname')}-${formData.get('lastname')}`;
                    const imageUrl =
                        image?.brutFile &&
                        (await getFileUrl({
                            file: image.brutFile,
                            desktopSize: 800,
                            fileName: `collaborator-${title}`,
                            oldUrls: {
                                desktop: defaultImage,
                            },
                        }));
                    imageUrl && formData.append('image', imageUrl);
                    return await updateCollaborator(formData);
                }}
                variant="warning"
                size="icon"
            >
                <FormContent collaborator={collaborator} image={image} onImageChange={getImageValue} />
                <input type="hidden" name="id" value={collaborator.id.toString()} />
            </DialogForm>
        );
    }

    return (
        <DialogForm
            title="Ajouter un collaborateur"
            textOpen={'Ajouter un collaborateur'}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations du collaborateur à ajouter."
            className="max-w-2xl"
            actionFn={async (formData) => {
                const title = `${formData.get('firstname')}-${formData.get('lastname')}`;
                const imageUrl =
                    image?.brutFile &&
                    (await getFileUrl({
                        file: image.brutFile,
                        desktopSize: 800,
                        fileName: `collaborator-${title}`,
                        oldUrls: {
                            desktop: defaultImage,
                        },
                    }));
                imageUrl && formData.append('image', imageUrl);
                return await createCollaborator(formData);
            }}
        >
            <FormContent image={image} onImageChange={getImageValue} />
        </DialogForm>
    );
};

export default FormSetCollaborator;

const FormContent = ({
    collaborator,
    image,
    onImageChange,
}: {
    collaborator?: Collaborator;
    image?: Picture;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <>
            <Label className="cursor-pointer flex flex-col items-center gap-2" htmlFor="image">
                <Avatar className="w-28 h-28 rounded-none">
                    <AvatarImage className="object-contain object-center" src={image?.url || ''} alt={`preview pricture`} />
                    <AvatarFallback>
                        <ImageIcon size={50} />
                    </AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted text-center">Modifier l'affiche</p>
                <p className="text-sm text-muted text-center">Taille idéale: 270x295px</p>
            </Label>
            <input hidden type="file" id="image" onChange={onImageChange} />
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="lastname">Nom*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="lastname"
                        type="text"
                        placeholder="Dupont"
                        name="lastname"
                        defaultValue={collaborator?.lastname}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="firstname">Prénom*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="firstname"
                        type="text"
                        placeholder="Henry"
                        name="firstname"
                        defaultValue={collaborator?.firstname}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="email"
                        type="text"
                        placeholder="example@test.com"
                        name="email"
                        defaultValue={collaborator?.email || ''}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="phone"
                        type="phone"
                        placeholder="06 XX XX XX XX"
                        name="phone"
                        defaultValue={collaborator?.phone || ''}
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    className="placeholder:text-accent"
                    id="description"
                    placeholder="Description"
                    name="description"
                    defaultValue={collaborator?.description || ''}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="role">Rôle(s)</Label>
                <Input
                    className="placeholder:text-accent"
                    id="role"
                    type="text"
                    placeholder="Fondatrice - comédienne - autrice"
                    name="role"
                    defaultValue={collaborator?.role || ''}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                    <Label htmlFor="youtube">
                        <Youtube size={30} />
                    </Label>
                    <Input
                        className="placeholder:text-accent"
                        id="youtube"
                        type="url"
                        placeholder="https://www.youtube.com"
                        name="youtube"
                        defaultValue={collaborator?.youtube || ''}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="facebook">
                        <FaceBook size={30} />
                    </Label>
                    <Input
                        className="placeholder:text-accent"
                        id="facebook"
                        type="url"
                        placeholder="https://www.facebook.com"
                        name="facebook"
                        defaultValue={collaborator?.facebook || ''}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                    <Label htmlFor="instagram">
                        <Instagram size={30} />
                    </Label>
                    <Input
                        className="placeholder:text-accent"
                        id="instagram"
                        type="url"
                        placeholder="https://www.instagram.com"
                        name="instagram"
                        defaultValue={collaborator?.instagram || ''}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="linkedin">
                        <Linkedin size={30} />
                    </Label>
                    <Input
                        className="placeholder:text-accent"
                        id="linkedin"
                        type="url"
                        placeholder="https://www.linkedin.com"
                        name="linkedin"
                        defaultValue={collaborator?.linkedin || ''}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="website">
                    <WebSite size={30} />
                </Label>
                <Input
                    className="placeholder:text-accent"
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    name="website"
                    defaultValue={collaborator?.website || ''}
                />
            </div>
        </>
    );
};
