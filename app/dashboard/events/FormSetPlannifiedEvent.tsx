'use client';

import DialogForm from '@/components/basics/DialogForm';
import SelectFromDB from '@/components/basics/SelectFromDB';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPlannifiedEvent, PlannifiedEventWithInclude, updatePlannifiedEvent } from '@/services/eventService';
import { format } from 'date-fns';
import { Settings, SquarePlus } from 'lucide-react';

const FormSetPlannifiedEvent = ({ event }: { event?: PlannifiedEventWithInclude }) => {
    if (event) {
        return (
            <DialogForm
                title="Modifier un évènement"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations de l'évènement à modifier."
                actionFn={async (formData) => {
                    const startDate = formData.get('startDate') as string;
                    const endDate = formData.get('endDate') as string;
                    endDate || formData.set('endDate', startDate);
                    return await updatePlannifiedEvent(formData);
                }}
                className="max-w-xl max-h-[900px] overflow-auto"
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
            title="Ajouter une date"
            textOpen={<SquarePlus size={26} />}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations de la date à ajouter."
            actionFn={async (formData) => {
                return await createPlannifiedEvent(formData);
            }}
            className="max-w-xl max-h-[900px] overflow-auto"
            size="icon"
            variant="ghost"
        >
            <FormContent event={event} />
        </DialogForm>
    );
};

export default FormSetPlannifiedEvent;

const FormContent = ({ event }: { event?: PlannifiedEventWithInclude }) => {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="event">Évènement*</Label>
                <SelectFromDB
                    selectLabel="Évènement"
                    model="event"
                    required
                    id="event"
                    placeholder="Sélectionner un évènement"
                    name="eventId"
                    defaultValue={event?.event.id.toString()}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="startDate">Date de début*</Label>
                <Input
                    id="startDate"
                    type="date"
                    name="startDate"
                    required
                    defaultValue={event?.startDate && format(event.startDate || '', 'yyyy-MM-dd')}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input id="endDate" type="date" name="endDate" defaultValue={event?.endDate && format(event.endDate || '', 'yyyy-MM-dd')} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="category">Lieu*</Label>
                    <SelectFromDB
                        selectLabel="Lieu"
                        model="location"
                        required
                        id="location"
                        placeholder="Sélectionner un lieu"
                        name="locationId"
                        defaultValue={event?.location.id.toString()}
                    />
                </div>
            </div>
        </>
    );
};
