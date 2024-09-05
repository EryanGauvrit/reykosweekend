'use client';

import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createEvent, updateEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import { format } from 'date-fns';
import { Settings, SquarePlus } from 'lucide-react';

const FormSetEvent = ({ event }: { event?: Event }) => {
    if (event) {
        return (
            <DialogForm
                title="Modifier un évènement"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations de l'évènement à modifier."
                actionFn={async (formData) => {
                    return await updateEvent(formData);
                }}
                className="max-w-2xl max-h-[900px] overflow-auto"
                size="icon"
                classNameTrigger="w-8 h-8"
                variant="warning"
            >
                <FormContent event={event} />
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
                return await createEvent(formData);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="icon"
            variant="ghost"
        >
            <FormContent />
        </DialogForm>
    );
};

export default FormSetEvent;

const FormContent = ({ event }: { event?: Event }) => {
    return (
        <>
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
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="startDate">Date de début*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="startDate"
                        type="datetime-local"
                        name="startDate"
                        defaultValue={event?.startDate && format(event.startDate || '', 'yyyy-MM-dd')}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="dueDate">Date de début*</Label>
                    <Input
                        className="placeholder:text-accent"
                        required
                        id="dueDate"
                        type="datetime-local"
                        name="dueDate"
                        defaultValue={event?.dueDate && format(event.dueDate || '', 'yyyy-MM-dd')}
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
                    defaultValue={event?.description}
                />
            </div>
        </>
    );
};
