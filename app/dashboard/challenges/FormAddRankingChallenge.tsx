'use client';

import DialogForm from '@/components/basics/DialogForm';
import SelectForm from '@/components/basics/SelectForm';
import { Label } from '@/components/ui/label';
import Ranking from '@/icons/Ranking';
import { setChallengeRanking } from '@/services/challengeService';
import { Team } from '@/services/playerService';
import { Medal } from 'lucide-react';
import { useState } from 'react';

const FormAddRankingChallenge = ({ challengeId, teams }: { challengeId: string; teams: Team[] }) => {
    const [participants, setParticipants] = useState<string[]>([]);

    return (
        <DialogForm
            title="Gestion du classement"
            textOpen={<Ranking size={20} />}
            textSubmit="Sauvegarder"
            description="Veuillez selectionner les équipes selon leur classement."
            actionFn={async (formData) => {
                const formDataQuery = new FormData();
                const data = Object.fromEntries(formData.entries());
                const teamsToQuery: string[] = [];

                Object.keys(data).forEach((key) => {
                    if (key.startsWith('team')) {
                        teamsToQuery.push(data[key] as string);
                    }
                });

                participants.forEach((participant) => {
                    teamsToQuery.push(participant);
                });

                formDataQuery.append('teams', JSON.stringify(teamsToQuery));
                formDataQuery.append('challengeId', challengeId);
                return await setChallengeRanking(formDataQuery);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="icon"
            variant="warning"
        >
            <div className="grid gap-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-amber-500" />
                    Récompenses du premier
                </h3>
                <Label htmlFor="team1">Ajouter une équipe qui a réussi</Label>
                <SelectForm
                    id="team1"
                    name="team1"
                    placeholder="Sélectionner une équipe"
                    className="w-full max-w-md"
                    required
                    data={teams.map((team) => ({ value: team.teamID.trim(), label: team.name.trim() }))}
                />
            </div>
            <div className="grid gap-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-gray-400" />
                    Récompenses du deuxième
                </h3>
                <Label htmlFor="team2">Ajouter une équipe qui a réussi</Label>
                <SelectForm
                    id="team2"
                    name="team2"
                    placeholder="Sélectionner une équipe"
                    className="w-full max-w-md"
                    required
                    data={teams.map((team) => ({ value: team.teamID.trim(), label: team.name.trim() }))}
                />
            </div>
            <div className="grid gap-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-amber-800" />
                    Récompenses du troisième
                </h3>
                <Label htmlFor="team3">Ajouter une équipe qui a réussi</Label>
                <SelectForm
                    id="team3"
                    name="team3"
                    placeholder="Sélectionner une équipe"
                    className="w-full max-w-md"
                    required
                    data={teams.map((team) => ({ value: team.teamID.trim(), label: team.name.trim() }))}
                />
            </div>
            <div className="grid gap-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Medal size={18} className="text-primary" />
                    Prime de participation
                </h3>
                {teams.map((team, index) => (
                    <div key={team.teamID} className="grid grid-cols-5 gap-2 max-w-xs">
                        <Label className="col-span-4">- {team.name}</Label>
                        <input
                            type="checkbox"
                            checked={participants.includes(team.teamID)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setParticipants([...participants, team.teamID]);
                                } else {
                                    setParticipants(participants.filter((participant) => participant !== team.teamID));
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </DialogForm>
    );
};

export default FormAddRankingChallenge;
