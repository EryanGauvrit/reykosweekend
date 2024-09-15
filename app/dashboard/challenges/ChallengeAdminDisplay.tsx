import DeleteAction from '@/components/basics/DeleteAction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Ranking from '@/icons/Ranking';
import { ChallengeWithAllInclude, deleteChallenge, getChallengeList } from '@/services/challengeService';
import { getTeamList, Team } from '@/services/playerService';
import FormAddRankingChallenge from './FormAddRankingChallenge';
import FormSetChallenge from './FormSetChallenge';
import ChallengeRankingDisplay from '@/components/context/ChallengeRankingDisplay';

const ChallengeAdminDisplay = async ({ eventId }: { eventId: string }) => {
    const { data: challenges, isErrored: challengeErr }: { data: ChallengeWithAllInclude[]; isErrored: boolean } =
        await getChallengeList(eventId);
    const { data: teams, isErrored: teamsErr }: { data: Team[]; isErrored: boolean } = await getTeamList(eventId);

    if (!challenges || challengeErr) {
        throw new Error('Erreur lors de la récupération des quêtes');
    }

    if (!teams || teamsErr) {
        throw new Error('Erreur lors de la récupération des équipes');
    }

    return (
        <div className="mt-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead className="min-w-[200px]">Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="min-w-[100px]">Score de Participation</TableHead>
                        <TableHead className="min-w-[100px]">Récompense de Participation</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {challenges.length > 0 ? (
                        challenges.map((challenge, index) => (
                            <TableRow key={challenge.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="min-w-[200px]">{challenge.title}</TableCell>
                                <TableCell className="whitespace-pre-wrap">{challenge.description}</TableCell>
                                <TableCell className="min-w-[100px]">{challenge.scoreParticipation}</TableCell>
                                <TableCell className="min-w-[100px]">{challenge.rewardParticipation}</TableCell>
                                <TableCell className="flex flex-wrap min-w-[100px] gap-2 items-center">
                                    <ChallengeRankingDisplay challengeId={challenge.id} title={challenge.title} />
                                    <FormAddRankingChallenge challengeId={challenge.id} teams={teams} />
                                    <FormSetChallenge challenge={challenge} eventId={eventId} />
                                    <DeleteAction
                                        id={challenge.id}
                                        title="Supprimer cet événement"
                                        description="Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible."
                                        messageValidation="Evénement supprimé"
                                        fnAction={deleteChallenge}
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
        </div>
    );
};

export default ChallengeAdminDisplay;
