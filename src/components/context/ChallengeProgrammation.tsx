import { ChallengeWithAllInclude, getChallengeList } from '@/services/challengeService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import ChallengeRankingDisplay from './ChallengeRankingDisplay';

const ChallengeProgrammation = async ({ eventId }: { eventId: string }) => {
    const { data: challenges, isErrored }: { data: ChallengeWithAllInclude[]; isErrored: boolean } = await getChallengeList(eventId);

    if (!challenges || isErrored) {
        throw new Error('Erreur lors de la récupération des challenges');
    }
    return (
        <section className="container">
            <h2 className="text-2xl font-bold uppercase">Programmation des challenges</h2>
            <Card className="p-4 mt-10">
                <CardHeader>
                    <CardDescription>Voici la liste des challenges programmés pour cet évènement</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap justify-center gap-5">
                    {challenges.length > 0 ? (
                        challenges.map((challenge) => (
                            <Card key={challenge.id} className="p-4 max-w-xs">
                                <CardHeader>
                                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                                    <CardDescription>
                                        A {format(challenge.startDate, 'HH:mm')} le {format(challenge.startDate, 'dd MMMM', { locale: fr })}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul>
                                        <li>Récompenses en score:</li>
                                        <li className="text-amber-500">
                                            - <span className="font-bold">Première place:</span> {challenge.scoreRewardFirst}
                                        </li>
                                        <li className="text-gray-400">
                                            - <span className="font-bold">Deuxième place:</span> {challenge.scoreRewardSecond}
                                        </li>
                                        <li className="text-amber-800">
                                            - <span className="font-bold">Troisième place:</span> {challenge.scoreRewardThird}
                                        </li>
                                        <li>
                                            - <span className="font-bold">Prime de participation:</span> {challenge.scoreParticipation}
                                        </li>
                                    </ul>
                                    <p className="my-2 text-sm">Et d'autres récompenses...</p>
                                </CardContent>
                                <CardFooter className="flex gap-4">
                                    <ChallengeRankingDisplay challengeId={challenge.id} title={challenge.title} />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Voir les détails</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{challenge.title}</DialogTitle>
                                                <DialogDescription>{challenge.description}</DialogDescription>
                                                <p className="text-sm">
                                                    Heure de début : {format(challenge.startDate, 'HH:mm')} le{' '}
                                                    {format(challenge.startDate, 'dd MMMM', { locale: fr })}
                                                </p>
                                                <p className="text-sm">
                                                    Heure de fin : {format(challenge.dueDate, 'HH:mm')} le{' '}
                                                    {format(challenge.dueDate, 'dd MMMM', { locale: fr })}
                                                </p>
                                            </DialogHeader>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="text-center">Place</TableHead>
                                                        <TableHead className="text-center">Score</TableHead>
                                                        <TableHead className="text-center">Récompense</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody className="text-center">
                                                    <TableRow>
                                                        <TableCell>🥇</TableCell>
                                                        <TableCell>{challenge.scoreRewardFirst}</TableCell>
                                                        <TableCell>{challenge.rewardFirst}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>🥈</TableCell>
                                                        <TableCell>{challenge.scoreRewardSecond}</TableCell>
                                                        <TableCell>{challenge.rewardSecond}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>🥉</TableCell>
                                                        <TableCell>{challenge.scoreRewardThird}</TableCell>
                                                        <TableCell>{challenge.rewardThird}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Part.</TableCell>
                                                        <TableCell>{challenge.scoreParticipation}</TableCell>
                                                        <TableCell>{challenge.rewardParticipation}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p>Aucun challenge programmé pour le moment</p>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default ChallengeProgrammation;
