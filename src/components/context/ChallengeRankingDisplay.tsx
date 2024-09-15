import Ranking from '@/icons/Ranking';
import Squad from '@/icons/Squad';
import { ChallengeRanking, getChallengeRanking } from '@/services/challengeService';
import clsx from 'clsx';
import { Medal } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const ChallengeRankingDisplay = async ({ challengeId, title }: { challengeId: string; title: string }) => {
    const { data: ranking, isErrored }: { data: ChallengeRanking[]; isErrored: boolean } = await getChallengeRanking(challengeId);

    if (!ranking || isErrored) {
        throw new Error('Erreur lors de la récupération du classement');
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size={'icon'}>
                    <Ranking size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                <span className="flex items-center justify-center gap-2">
                                    <Ranking size={20} />
                                    Position
                                </span>
                            </TableHead>
                            <TableHead className="min-w-[100px]">
                                <span className="flex items-center justify-center gap-2">
                                    <Squad size={20} />
                                    Équipe
                                </span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ranking.length > 0 ? (
                            ranking.map((rank, index) => (
                                <TableRow
                                    key={index}
                                    className={clsx(
                                        'text-center',
                                        rank.rankPosition === 1 && 'text-amber-500',
                                        rank.rankPosition === 2 && 'text-gray-400',
                                        rank.rankPosition === 3 && 'text-amber-800',
                                    )}
                                >
                                    <TableCell>
                                        {rank.rankPosition <= 3 ? (
                                            <Medal
                                                size={20}
                                                className={clsx(
                                                    'm-auto',
                                                    rank.rankPosition === 1 && 'text-amber-500',
                                                    rank.rankPosition === 2 && 'text-gray-400',
                                                    rank.rankPosition === 3 && 'text-amber-800',
                                                )}
                                            />
                                        ) : (
                                            '-'
                                        )}
                                    </TableCell>
                                    <TableCell>{rank.team.name}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2}>Aucun classement</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
};

export default ChallengeRankingDisplay;
