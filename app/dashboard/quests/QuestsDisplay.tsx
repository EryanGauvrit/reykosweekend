import DeleteAction from '@/components/basics/DeleteAction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { userIsAuthorized } from '@/services/authService';
import { getTeamList, Team } from '@/services/playerService';
import { deleteQuest, getQuestsList, QuestWhithAllInclude } from '@/services/questService';
import { Eye } from 'lucide-react';
import FormAddTeamQuest from './FormAddTeamQuest';
import FormRemoveTeamQuest from './FormRemoveTeamQuest';
import FormSetQuest from './FormSetQuest';

const QuestsDisplay = async ({ eventId }: { eventId: string }) => {
    const { data: quests, isErrored: questErr }: { data: QuestWhithAllInclude[]; isErrored: boolean } = await getQuestsList(eventId);
    const isAuthorized = await userIsAuthorized();
    const { data: teams, isErrored: teamsErr }: { data: Team[]; isErrored: boolean } = isAuthorized
        ? await getTeamList(eventId)
        : { data: [], isErrored: false };

    if (!quests || questErr) {
        throw new Error('Erreur lors de la récupération des quêtes');
    }

    if (isAuthorized && (!teams || teamsErr)) {
        throw new Error('Erreur lors de la récupération des équipes');
    }

    return (
        <div className="mt-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead className="min-w-[200px]">Titre</TableHead>
                        {isAuthorized && <TableHead>Description</TableHead>}
                        <TableHead className="min-w-[100px]">Score</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quests.length > 0 ? (
                        quests.map((quest, index) => (
                            <TableRow key={quest.id}>
                                <TableCell>{index}</TableCell>
                                <TableCell className="min-w-[200px]">{quest.title}</TableCell>
                                {isAuthorized && <TableCell className="whitespace-pre-wrap">{quest.description}</TableCell>}
                                <TableCell className="min-w-[100px]">{quest.scoreReward}</TableCell>
                                <TableCell className="flex flex-wrap min-w-[100px] gap-2 items-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Eye size={24} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader className="gap-5">
                                                <DialogTitle>
                                                    {quest.title} - {quest.scoreReward} points
                                                </DialogTitle>
                                                <DialogDescription>{quest.description}</DialogDescription>
                                            </DialogHeader>
                                            <ul className="flex flex-col gap-2">
                                                {quest.teams.length > 0 ? (
                                                    quest.teams.map((team) => (
                                                        <li key={team.teamID} className="text-primary">
                                                            ✅ {team.name}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-destructive">Aucune équipe n'a validé cette quête</li>
                                                )}
                                            </ul>
                                        </DialogContent>
                                    </Dialog>
                                    {isAuthorized && (
                                        <>
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
                                        </>
                                    )}
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
        </div>
    );
};

export default QuestsDisplay;
