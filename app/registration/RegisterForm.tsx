'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import Loader from '@/components/basics/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';

const RegisterForm = ({ eventId }: { eventId: string }) => {
    const { toast } = useToast();
    const [nbrPlayer, setNbrPlayer] = useState(3);
    return (
        <CardContent>
            <form className="flex flex-col gap-4 max-w-4xl w-full" action={(formData) => console.log(formData)}>
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
                            <FormPlayer isOwner />
                        </Card>
                        {[...Array(nbrPlayer - 1)].map((_, i) => (
                            <Card key={i} className="flex items-center gap-2 p-4">
                                <FormPlayer nbrPlayer={i} />
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
                <input type="hidden" name="eventId" value={eventId} />
                <ButtonSubmit type="submit">Envoyé la demande</ButtonSubmit>
                <Loader />
            </form>
        </CardContent>
    );
};

export default RegisterForm;

const FormPlayer = ({ isOwner, nbrPlayer }: { isOwner?: boolean; nbrPlayer?: number }) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {isOwner && (
                <>
                    <h4 className="col-span-2 text-base font-bold">Chef de l'équipe</h4>
                    <input type="hidden" name="isOwner" value="true" />
                </>
            )}
            <div className="grid gap-2">
                <Label htmlFor={'nickname' + nbrPlayer}>Nom / pseudo*</Label>
                <Input required name={'nickname' + nbrPlayer} type="text" placeholder="Robert" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={'minecraftNickname' + nbrPlayer} className="min-w-32">
                    pseudo Minecraft*
                </Label>
                <Input required name={'minecraftNickname' + nbrPlayer} type="text" placeholder="KikouBg2005" />
            </div>
            <div className="grid gap-2 col-span-2">
                <Label htmlFor={'email' + nbrPlayer}>email</Label>
                <Input name={'email' + nbrPlayer} type="email" placeholder="KikouBg2005@exemple.com" />
            </div>
        </div>
    );
};
