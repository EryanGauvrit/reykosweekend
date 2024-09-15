'use client';

import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChallengeWithAllInclude, createChallenge, updateChallenge } from '@/services/challengeService';
import { Challenge } from '@prisma/client';
import { format } from 'date-fns';
import { Medal, Settings } from 'lucide-react';

const FormSetChallenge = ({ challenge, eventId }: { challenge?: ChallengeWithAllInclude; eventId: string }) => {
    if (challenge) {
        return (
            <DialogForm
                title="Modifier un challenge"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations du challenge à modifier."
                actionFn={async (formData) => {
                    const challengeForm = { ...Object.fromEntries(formData.entries()), eventId };
                    const query = new FormData();
                    query.append('challenge', JSON.stringify(challengeForm));
                    query.append('id', challenge.id);
                    return await updateChallenge(query);
                }}
                className="max-w-2xl max-h-[900px] overflow-auto"
                size="icon"
                variant="warning"
            >
                <FormContent challenge={challenge} />
            </DialogForm>
        );
    }

    return (
        <DialogForm
            title="Ajouter un challenge"
            textOpen={'Ajouter un challenge'}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations du challenge à ajouter."
            actionFn={async (formData) => {
                const challenge = { ...Object.fromEntries(formData.entries()), eventId };
                const query = new FormData();
                query.append('challenge', JSON.stringify(challenge));
                return await createChallenge(query);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="sm"
            variant="success"
        >
            <FormContent />
        </DialogForm>
    );
};

export default FormSetChallenge;

const FormContent = ({ challenge }: { challenge?: Challenge }) => {
    return (
        <>
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
                        defaultValue={challenge?.title}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="startDate">Date de début*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="startDate"
                        type="datetime-local"
                        name="startDate"
                        defaultValue={challenge?.startDate && format(challenge.startDate || '', 'yyyy-MM-dd HH:mm').replace(' ', 'T')}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="dueDate">Date de fin*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="dueDate"
                        type="datetime-local"
                        name="dueDate"
                        defaultValue={challenge?.dueDate && format(challenge.dueDate || '', 'yyyy-MM-dd HH:mm').replace(' ', 'T')}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <h3 className="col-span-2 text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-amber-500" />
                    Récompenses du premier
                </h3>
                <div className="grid gap-2">
                    <Label htmlFor="scoreRewardFirst">Score*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="scoreRewardFirst"
                        type="number"
                        placeholder="1 000"
                        name="scoreRewardFirst"
                        min={0}
                        defaultValue={challenge?.scoreRewardFirst}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="rewardFirst">Autre*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="rewardFirst"
                        type="text"
                        placeholder="Une épée"
                        name="rewardFirst"
                        min={0}
                        defaultValue={challenge?.rewardFirst}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <h3 className="col-span-2 text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-gray-400" />
                    Récompenses du deuxième
                </h3>
                <div className="grid gap-2">
                    <Label htmlFor="scoreRewardSecond">Score*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="scoreRewardSecond"
                        type="number"
                        placeholder="1 000"
                        name="scoreRewardSecond"
                        min={0}
                        defaultValue={challenge?.scoreRewardSecond}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="rewardSecond">Autre*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="rewardSecond"
                        type="text"
                        placeholder="Une épée"
                        name="rewardSecond"
                        min={0}
                        defaultValue={challenge?.rewardSecond}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <h3 className="col-span-2 text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-amber-800" />
                    Récompenses du troisième
                </h3>
                <div className="grid gap-2">
                    <Label htmlFor="scoreRewardThird">Score*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="scoreRewardThird"
                        type="number"
                        placeholder="1 000"
                        name="scoreRewardThird"
                        min={0}
                        defaultValue={challenge?.scoreRewardThird}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="rewardThird">Autre*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="rewardThird"
                        type="text"
                        placeholder="Une épée"
                        name="rewardThird"
                        min={0}
                        defaultValue={challenge?.rewardThird}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <h3 className="col-span-2 text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-primary" />
                    Prime de participation
                </h3>
                <div className="grid gap-2">
                    <Label htmlFor="scoreParticipation">Score*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="scoreParticipation"
                        type="number"
                        placeholder="1 000"
                        name="scoreParticipation"
                        min={0}
                        defaultValue={challenge?.scoreParticipation}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="rewardParticipation">Autre*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="rewardParticipation"
                        type="text"
                        placeholder="Une épée"
                        name="rewardParticipation"
                        min={0}
                        defaultValue={challenge?.rewardParticipation}
                    />
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
                    defaultValue={challenge?.description}
                />
            </div>
        </>
    );
};
