'use client';

import DialogForm from '@/components/basics/DialogForm';
import SelectForm from '@/components/basics/SelectForm';
import { Label } from '@/components/ui/label';
import { Team } from '@/services/playerService';
import { QuestWhithAllInclude, validateQuest } from '@/services/questService';
import { Users2 } from 'lucide-react';

const FormAddTeamQuest = ({ quest, teams }: { quest: QuestWhithAllInclude; teams: Team[] }) => {
    return (
        <DialogForm
            title="Validation de quête"
            textOpen={<Users2 size={20} />}
            textSubmit="Sauvegarder"
            description="Veuillez selectionner l'équipe' ayant validé cette quête."
            actionFn={async (formData) => {
                return await validateQuest(formData);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="icon"
            classNameTrigger="w-8 h-8"
            variant="success"
        >
            <div className="grid gap-2">
                <Label htmlFor="teamId">Ajouter une équipe qui a réussi</Label>
                <SelectForm
                    id="teamId"
                    name="teamId"
                    placeholder="Sélectionner une équipe"
                    className="w-full max-w-md"
                    required
                    data={teams.map((team) => ({ value: team.teamID.trim(), label: team.name.trim() }))}
                />
            </div>
            <input type="hidden" name="questId" value={quest.id} />
        </DialogForm>
    );
};

export default FormAddTeamQuest;
