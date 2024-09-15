import DeleteAction from '@/components/basics/DeleteAction';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deletePlayer, deleteTeam, getTeamListAll, TeamWithAllInclude } from '@/services/playerService';
import FormSetPlayer from './FormSetPlayer';

const TeamDisplay = async ({ eventId }: { eventId: string }) => {
    const res = await getTeamListAll(eventId);

    const teams: TeamWithAllInclude[] = !res.isErrored && res.data;

    return (
        <div className="mt-5 w-full">
            <h2 className="text-2xl font-bold my-5">Liste des équipes inscrites</h2>
            <div className="grid grid-cols-2 gap-5">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <Card key={team.teamID} className="p-3">
                            <CardHeader>
                                <CardTitle>{team.name}</CardTitle>
                                <p>{team.players.length}/5 Membres</p>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom</TableHead>
                                            <TableHead>Minecraft</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {team.players.map((player) => (
                                            <TableRow key={player.id}>
                                                <TableCell>{player.nickname}</TableCell>
                                                <TableCell>{player.minecraftNickname}</TableCell>
                                                <TableCell>{player.email}</TableCell>
                                                <TableCell>{player.isOwner ? 'Chef' : 'Membre'}</TableCell>
                                                <TableCell>
                                                    <FormSetPlayer playerProps={player} teamId={team.teamID} eventId={eventId} />
                                                    <DeleteAction
                                                        id={player.id}
                                                        title="Supprimer ce joueur"
                                                        description="Voulez-vous vraiment supprimer ce joueur ?"
                                                        messageValidation="Joueur supprimé"
                                                        fnAction={deletePlayer}
                                                        className="ml-2"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <FormSetPlayer teamId={team.teamID} eventId={eventId} />
                                <DeleteAction
                                    id={team.teamID}
                                    title="Supprimer cette équipe"
                                    description="Voulez-vous vraiment supprimer cette équipe ? Les membres associés seront également supprimés. Cette action est irréversible."
                                    messageValidation="Equipe supprimée"
                                    fnAction={deleteTeam}
                                    className="ml-2"
                                />
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>Aucune équipe inscrite</p>
                )}
            </div>
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default TeamDisplay;
