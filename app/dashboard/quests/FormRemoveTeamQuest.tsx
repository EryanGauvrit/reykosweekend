'use client';

import DialogForm from '@/components/basics/DialogForm';
import SelectForm from '@/components/basics/SelectForm';
import { Label } from '@/components/ui/label';
import { Team } from '@/services/playerService';
import { QuestWhithAllInclude, unvalidateQuest, validateQuest } from '@/services/questService';
import { Users2 } from 'lucide-react';

const FormRemoveTeamQuest = ({ quest }: { quest: QuestWhithAllInclude }) => {
    return (
        <DialogForm
            title="Gestion de validation de quête"
            textOpen={<Users2 size={20} />}
            textSubmit="Sauvegarder"
            description="Veuillez selectionner l'équipe qui n'a pas réussi cette quête."
            actionFn={async (formData) => {
                return await unvalidateQuest(formData);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="icon"
            classNameTrigger="w-8 h-8"
            variant="destructive"
        >
            <div className="grid gap-2">
                <Label htmlFor="teamId">Supprimé une équipe</Label>
                <SelectForm
                    id="teamId"
                    name="teamId"
                    placeholder="Sélectionner une équipe"
                    className="w-full max-w-md"
                    required
                    data={quest.teams.map((team) => ({ value: team.teamID.trim(), label: team.name.trim() }))}
                />
            </div>
            <input type="hidden" name="questId" value={quest.id} />
        </DialogForm>
    );
};

export default FormRemoveTeamQuest;
