'use client';

import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createQuest, QuestWhithAllInclude, updateQuest } from '@/services/questService';
import { Quest } from '@prisma/client';
import { Settings } from 'lucide-react';

const FormSetQuest = ({ quest, eventId }: { quest?: QuestWhithAllInclude; eventId: string }) => {
    if (quest) {
        return (
            <DialogForm
                title="Modifier une quête"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations de la quête à modifier."
                actionFn={async (formData) => {
                    const quest = { ...Object.fromEntries(formData.entries()) };
                    const query = new FormData();
                    query.append('quest', JSON.stringify(quest));
                    query.append('id', quest.id);
                    return await updateQuest(query);
                }}
                className="max-w-2xl max-h-[900px] overflow-auto"
                size="icon"
                variant="warning"
            >
                <FormContent quest={quest} />
            </DialogForm>
        );
    }

    return (
        <DialogForm
            title="Ajouter une quête"
            textOpen={'Ajouter une quête'}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations de la quête à ajouter."
            actionFn={async (formData) => {
                const quest = { ...Object.fromEntries(formData.entries()), eventId };
                const query = new FormData();
                query.append('quest', JSON.stringify(quest));
                return await createQuest(query);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="sm"
            variant="success"
        >
            <FormContent />
        </DialogForm>
    );
};

export default FormSetQuest;

const FormContent = ({ quest }: { quest?: Quest }) => {
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
                        defaultValue={quest?.title}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="scoreReward">Score*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="scoreReward"
                        type="number"
                        placeholder="1 000"
                        name="scoreReward"
                        min={0}
                        defaultValue={quest?.scoreReward}
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
                    defaultValue={quest?.description}
                />
            </div>
        </>
    );
};
