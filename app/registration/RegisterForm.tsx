'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import Loader from '@/components/basics/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { createTeamRegister } from '@/services/playerService';
import { Player } from '@prisma/client';
import { Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const RegisterForm = ({ eventId }: { eventId: string }) => {
    const { toast } = useToast();
    const [nbrPlayer, setNbrPlayer] = useState(3);
    const ref = useRef<HTMLFormElement>(null);

    const onSubmit = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        const players = [...Array(nbrPlayer)].map((_, i) => ({
            nickname: data['nickname' + i] as string,
            minecraftNickname: data['minecraftNickname' + i] as string,
            email: data['email' + i] as string,
            isOwner: data['isOwner' + i] === 'true',
            eventId,
        }));

        const team = {
            name: data.name,
            registerContext: data.registerContext,
            eventId: data.eventId,
        };

        const formDataQuery = new FormData();
        formDataQuery.append('team', JSON.stringify(team));
        formDataQuery.append('players', JSON.stringify(players));

        const res = await createTeamRegister(formDataQuery);

        if (res.isErrored) {
            toast({ variant: 'destructive', title: "Erreur lors de la création de l'équipe." });
            return;
        }

        toast({ variant: 'success', title: 'Ta demande a bien été envoyée.' });
        ref.current?.reset();
    };

    return (
        <CardContent className="p-2 xs:p-6">
            <form ref={ref} className="flex flex-col gap-4 max-w-4xl w-full" action={onSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom de l'équipe*</Label>
                    <Input required name="name" type="text" placeholder="Ma super équipe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="registerContext">D'où connais-tu l'évènement, qui t'en a parlé et par quel moyen ?*</Label>
                    <Textarea
                        required
                        name="registerContext"
                        cols={30}
                        rows={4}
                        placeholder="C'est robert qui parlé de ce magnifique event sur Discord ..."
                    ></Textarea>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                        Liste des membres
                        <Button
                            disabled={nbrPlayer >= 5}
                            size={'icon'}
                            onClick={(e) => {
                                e.preventDefault();
                                if (nbrPlayer >= 5) {
                                    toast({ variant: 'destructive', title: 'Vous ne pouvez pas avoir plus de 5 joueurs dans une équipe.' });
                                    return;
                                }
                                setNbrPlayer(nbrPlayer + 1);
                            }}
                        >
                            <Plus size={20} />
                        </Button>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="p-4">
                            <FormPlayer isOwner nbrPlayer={0} />
                        </Card>
                        {[...Array(nbrPlayer - 1)].map((_, i) => (
                            <Card key={i} className="flex flex-col-reverse items-end sm:flex-row sm:items-center gap-2 p-4">
                                <FormPlayer nbrPlayer={i + 1} />
                                <Button
                                    variant={'destructive'}
                                    disabled={nbrPlayer <= 3}
                                    size={'icon'}
                                    className="min-w-10"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (nbrPlayer <= 3) {
                                            toast({
                                                variant: 'destructive',
                                                title: 'Vous ne pouvez pas avoir moins de 3 joueurs dans une équipe.',
                                            });
                                            return;
                                        }
                                        setNbrPlayer(nbrPlayer - 1);
                                    }}
                                >
                                    <Trash size={20} />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
                <p>
                    <span className="text-xs">* Champs obligatoires</span>
                </p>
                <p>
                    En envoyant cette demande, vous acceptez les{' '}
                    <Link href={'/rules'} className="underline">
                        règles
                    </Link>{' '}
                    et le chef désigné de l'équipe accepte d'être le contact principal pour l'organisation de l'évènement.
                </p>
                <input type="hidden" name="eventId" value={eventId} />
                <ButtonSubmit type="submit">Envoyé la demande</ButtonSubmit>
                <Loader />
            </form>
        </CardContent>
    );
};

export default RegisterForm;

export const FormPlayer = ({ isOwner, nbrPlayer, player }: { isOwner?: boolean; nbrPlayer?: number; player?: Player }) => {
    return (
        <div className="flex flex-col items-center m-auto xs:grid xs:grid-cols-2 gap-2">
            {isOwner && (
                <>
                    <h4 className="col-span-2 text-base font-bold">Chef de l'équipe</h4>
                    <input type="hidden" name={'isOwner' + (nbrPlayer ? nbrPlayer?.toString() : '0')} value="true" />
                </>
            )}
            <div className="xs:grid gap-2">
                <Label htmlFor={'nickname' + (nbrPlayer ? nbrPlayer?.toString() : '0')}>Nom / pseudo*</Label>
                <Input
                    required
                    name={'nickname' + (nbrPlayer ? nbrPlayer?.toString() : '0')}
                    type="text"
                    placeholder="Robert"
                    defaultValue={player?.nickname}
                />
            </div>
            <div className="xs:grid gap-2">
                <Label htmlFor={'minecraftNickname' + (nbrPlayer ? nbrPlayer?.toString() : '0')} className="min-w-32">
                    pseudo Minecraft*
                </Label>
                <Input
                    required
                    name={'minecraftNickname' + (nbrPlayer ? nbrPlayer?.toString() : '0')}
                    type="text"
                    placeholder="KikouBg2005"
                    defaultValue={player?.minecraftNickname}
                />
            </div>
            <div className="xs:grid gap-2 col-span-2">
                <Label htmlFor={'email' + (nbrPlayer ? nbrPlayer?.toString() : '0')}>email{isOwner && '*'}</Label>
                <Input
                    name={'email' + (nbrPlayer ? nbrPlayer?.toString() : '0')}
                    type="email"
                    placeholder="KikouBg2005@exemple.com"
                    defaultValue={player?.email || undefined}
                    required={isOwner}
                />
            </div>
        </div>
    );
};
