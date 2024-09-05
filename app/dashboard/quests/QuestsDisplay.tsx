import DeleteAction from '@/components/basics/DeleteAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Team, teamList } from '@/services/playerService';
import { deleteQuest, getQuestsList, QuestWhithAllInclude } from '@/services/questService';
import FormSetQuest from './FormSetQuest';
import FormAddTeamQuest from './FormAddTeamQuest';
import FormRemoveTeamQuest from './FormRemoveTeamQuest';

const QuestsDisplay = async ({ eventId }: { eventId: string }) => {
    const res = await getQuestsList(eventId);
    const teamsRes = await teamList(eventId);

    const teams: Team[] = !teamsRes.isErrored ? teamsRes.data : [];
    const quests: QuestWhithAllInclude[] = !res.isErrored ? res.data : [];

    return (
        <div className="mt-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Equipes</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quests.length > 0 ? (
                        quests.map((quest) => (
                            <TableRow key={quest.id}>
                                <TableCell>{quest.title}</TableCell>
                                <TableCell className="whitespace-pre-wrap">{quest.description}</TableCell>
                                <TableCell>{quest.scoreReward}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        {quest.teams.length > 0 ? (
                                            quest.teams.map((team) => (
                                                <p className="text-sm" key={team.teamID}>
                                                    - {team.name}
                                                </p>
                                            ))
                                        ) : (
                                            <p>Aucune équipe</p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    <FormAddTeamQuest quest={quest} teams={teams} />
                                    <FormRemoveTeamQuest quest={quest} />
                                    <FormSetQuest quest={quest} eventId={eventId} />
                                    <DeleteAction
                                        id={quest.id}
                                        title="Supprimer cet événement"
                                        description="Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible."
                                        messageValidation="Evénement supprimé"
                                        fnAction={deleteQuest}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>Aucune quête enregistrée</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default QuestsDisplay;
