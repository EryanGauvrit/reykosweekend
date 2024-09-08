'use client';

import Podium from '@/icons/Podium';
import Ranking from '@/icons/Ranking';
import Squad from '@/icons/Squad';
import { getTeamListAll, TeamWithAllInclude } from '@/services/playerService';
import clsx from 'clsx';
import { Eye, ShieldQuestion, Swords, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Loader from '../basics/Loader';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useToast } from '../ui/use-toast';

const GeneralRanking = ({ eventId }: { eventId: string }) => {
    const [teams, setTeams] = useState<TeamWithAllInclude[]>([]);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await getTeamListAll(eventId);
            console.log('EXECUTE');
            if (response.isErrored) {
                toast({
                    title: 'Erreur',
                    description: 'Une erreur est survenue lors de la récupération des équipes',
                    variant: 'destructive',
                });
                setIsLoading(false);
                return;
            }
            setTeams(response.data);
            setIsLoading(false);
        };

        // function to fetch teams every 5 minutes
        fetchTeams();
        const interval = setInterval(() => {
            fetchTeams();
        }, 300000);

        return () => clearInterval(interval);
    }, [eventId, toast]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="uppercase flex items-center gap-2">
                    <Podium size={25} />
                    Classement général
                </CardTitle>
                <CardDescription>
                    Un total de {teams.length} équipe{teams.length > 1 && 's'} en jeu
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center flex">
                                <span className="flex items-center gap-2">
                                    <Ranking size={20} />
                                    Position
                                </span>
                            </TableHead>
                            <TableHead className="min-w-[100px]">
                                <span className="flex items-center gap-2">
                                    <Squad size={20} />
                                    Équipe
                                </span>
                            </TableHead>
                            <TableHead className="min-w-[100px] text-center">
                                <span className="flex items-center gap-2">
                                    <Swords size={20} />
                                    Points
                                </span>
                            </TableHead>
                            <TableHead className="text-center">
                                <span className="flex items-center gap-2">
                                    <ShieldQuestion size={20} />
                                    Quêtes
                                </span>
                            </TableHead>
                            <TableHead className="text-center">
                                <span className="flex items-center gap-2">
                                    <Users size={20} />
                                    Membres
                                </span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-32">
                                    <Loader inComponent withoutPending size={50} />
                                </TableCell>
                            </TableRow>
                        ) : teams.length > 0 ? (
                            teams.map((team, index) => (
                                <TableRow
                                    key={team.teamID}
                                    className={clsx(
                                        'text-primary',
                                        `${index + 1 === 1 && 'text-amber-500'}`,
                                        `${index + 1 === 2 && 'text-gray-400'}`,
                                        `${index + 1 === 3 && 'text-amber-800'}`,
                                    )}
                                >
                                    <TableCell className="text-center">#{index + 1}</TableCell>
                                    <TableCell className="min-w-[100px]">{team.name}</TableCell>
                                    <TableCell className="min-w-[100px] text-center">{team.score}</TableCell>
                                    <TableCell className="text-center">{team._count.quests}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Eye size={24} />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader className="gap-5">
                                                    <DialogTitle>
                                                        {team.name} - {team.score} points
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <ul className="flex flex-col gap-2">
                                                    {team.players.map((member) => (
                                                        <li key={member.id} className="text-primary">
                                                            {member.nickname} [InGame: {member.minecraftNickname}]{' '}
                                                            {member.isOwner ? '(Chef)' : ''}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Aucune équipe n'a été trouvée
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default GeneralRanking;
