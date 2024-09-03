'use client';

import AlertDialogComp from '@/components/basics/AlertDialog';
import Loader from '@/components/basics/Loader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { updateUser } from '@/services/userService';
import { User } from '@prisma/client';
import { User as UserIcon } from 'lucide-react';
import { User as UserSession } from 'next-auth';
import { useState } from 'react';

type PersonnalInformationsProps = {
    user: User;
    userSession: UserSession;
};

const PersonnalInformations = ({ user, userSession }: PersonnalInformationsProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paramsPersonnalInformations, setParamsPersonnalInformations] = useState<FormData | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (formData: FormData) => {
        setParamsPersonnalInformations(formData);
    };
    const handleUpdateUser = async () => {
        if (!paramsPersonnalInformations) return;
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const res = await updateUser(paramsPersonnalInformations, userSession?.email as string);
                if (res.isErrored) {
                    toast({ variant: res.variant, title: res.title, description: res.data });
                } else {
                    toast({ variant: res.variant, title: res.title, description: res.description });
                }
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }, 1000);
    };

    return (
        <form className="max-w-7xl flex flex-wrap justify-center gap-x-40 my-8 m-auto" action={handleSubmit}>
            <div className="pt-5">
                <UserIcon className="w-24 h-24 p-1 bg-muted rounded-full" />
            </div>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="text-xl text-center">
                    <h2 id="personnal-informations" className="uppercase font-bold">
                        Informations personnelles
                    </h2>
                </div>
                <Card className="flex flex-col justify-center p-10 gap-4 border-card bg-transparent border-2">
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="firstName">
                            Prénom
                        </Label>
                        <Input id="firstname" type="text" name="name" defaultValue={`${user?.name}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="lastName">
                            Nom
                        </Label>
                        <Input id="lastName" type="text" name="username" defaultValue={`${user?.username}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="email">
                            Email
                        </Label>
                        <Input id="email" type="text" name="email" defaultValue={`${user?.email}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center border border-destructive p-2 rounded-md">
                        <Label className="w-full" htmlFor="password">
                            Mot de passe
                        </Label>
                        <Input className="placeholder:text-accent" id="password" type="password" name="password" placeholder="******" />
                    </div>
                    <AlertDialogComp
                        title="Modifier vos informations personnelles"
                        description="Voulez-vous vraiment modifier vos informations personnelles ?"
                        closeLabel="Annuler"
                        confirmLabel="Sauvegarder"
                        openLabel="Sauvegarder"
                        isSubmit
                        confirmAction={handleUpdateUser}
                        className="place-self-end"
                    />
                </Card>
            </div>
            {isLoading && <Loader withoutPending />}
        </form>
    );
};

export default PersonnalInformations;
