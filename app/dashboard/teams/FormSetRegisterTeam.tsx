'use client';

import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateTeamRegister } from '@/services/playerService';
import { TeamRegister } from '@prisma/client';
import { Wrench } from 'lucide-react';

const FormSetRegisterTeam = ({ teamProps, eventId }: { teamProps: TeamRegister; eventId: string }) => {
    return (
        <DialogForm
            title="Modifier cette équipe"
            textOpen={<Wrench size={20} />}
            textSubmit="Sauvegarder"
            description="Veuillez renseigner les informations de l'équipe à modifier."
            className="max-w-2xl"
            actionFn={async (formData) => {
                const data = { ...Object.fromEntries(formData.entries()), eventId };
                const formDataQuery = new FormData();
                formDataQuery.append('team', JSON.stringify(data));
                formDataQuery.append('id', teamProps.id);
                return await updateTeamRegister(formDataQuery);
            }}
            variant="warning"
            size="icon"
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Nom de l'équipe*</Label>
                <Input required name="name" type="text" placeholder="Ma super équipe" defaultValue={teamProps?.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="registerContext">D'où connais-tu l'évènement, qui t'en a parlé et par quel moyen ?*</Label>
                <Textarea
                    required
                    name="registerContext"
                    cols={30}
                    rows={4}
                    placeholder="C'est robert qui parlé de ce magnifique event sur Discord ..."
                    defaultValue={teamProps?.registerContext}
                ></Textarea>
            </div>
            <input type="hidden" name="id" value={teamProps.id} />
        </DialogForm>
    );
};
export default FormSetRegisterTeam;
