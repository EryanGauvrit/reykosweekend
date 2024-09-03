'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import Loader from '@/components/basics/Loader';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import FaceBook from '@/icons/FaceBook';
import Instagram from '@/icons/Instagram';
import Linkedin from '@/icons/Linkedin';
import Youtube from '@/icons/Youtube';
import { updateGlobalSettings } from '@/services/webSiteSettingsService';
import { useRouter } from 'next/navigation';

type Props = {
    webSiteSettings?: {
        id: number;
        emailContact: string;
        instagram: string | null;
        youtube: string | null;
        facebook: string | null;
        linkedin: string | null;
    } | null;
};
const FormWebSite = ({ webSiteSettings }: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    return (
        <form
            className="flex flex-col gap-4 my-7 max-w-4xl w-full pl-10"
            action={(formData) => {
                updateGlobalSettings(formData)
                    .then((res) => {
                        if (res.isErrored) {
                            toast({ variant: res.variant, title: res.title, description: res.data });
                        } else {
                            toast({ variant: res.variant, title: 'Le site a bien été modifié', description: res.description });
                        }
                        router.refresh();
                    })
                    .catch((err) => {
                        toast({ variant: 'destructive', title: 'Erreur', description: err });
                    });
            }}
        >
            <div className="grid grid-cols-2 gap-3 place-items-center">
                <Label className="w-full" htmlFor="email">
                    Email de contact *
                </Label>
                <Input required className="w-full" type="text" id="email" name="email" defaultValue={webSiteSettings?.emailContact || ''} />
                <p className="text-xs col-span-2 place-self-start">
                    C'est sur cette boîte mail que vous recevrez les emails des utilisateurs
                </p>
            </div>
            <Card className="flex flex-col justify-center p-10 gap-4 border-card bg-transparent border-2">
                <CardTitle className="text-center uppercase font-bold">Réseaux sociaux</CardTitle>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full flex items-center gap-2" htmlFor="instagram">
                            <Instagram size={24} />
                            Lien Instagram
                        </Label>
                        <Input
                            className="w-full placeholder:text-muted"
                            type="text"
                            id="instagram"
                            name="instagram"
                            defaultValue={webSiteSettings?.instagram || ''}
                            placeholder="https://www.instagram.com/username"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full flex items-center gap-2" htmlFor="youtube">
                            <Youtube size={24} />
                            Lien Youtube
                        </Label>
                        <Input
                            className="w-full placeholder:text-muted"
                            type="text"
                            id="youtube"
                            name="youtube"
                            defaultValue={webSiteSettings?.youtube || ''}
                            placeholder="https://www.youtube.com/channel/username"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full flex items-center gap-2" htmlFor="facebook">
                            <FaceBook size={24} />
                            Lien Facebook
                        </Label>
                        <Input
                            className="w-full placeholder:text-muted"
                            type="text"
                            id="facebook"
                            name="facebook"
                            defaultValue={webSiteSettings?.facebook || ''}
                            placeholder="https://www.facebook.com/username"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full flex items-center gap-2" htmlFor="linkedin">
                            <Linkedin size={24} />
                            Lien Linkedin
                        </Label>
                        <Input
                            className="w-full placeholder:text-muted"
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            defaultValue={webSiteSettings?.linkedin || ''}
                            placeholder="https://www.linkedin.com/in/username"
                        />
                    </div>
                </CardContent>
                <input type="hidden" name="id" value={webSiteSettings?.id} />
            </Card>
            <ButtonSubmit type="submit" className="w-40 m-auto">
                Enregistrer
            </ButtonSubmit>
            <Loader />
        </form>
    );
};

export default FormWebSite;
