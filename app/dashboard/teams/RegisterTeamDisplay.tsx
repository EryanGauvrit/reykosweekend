import DeleteAction from '@/components/basics/DeleteAction';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deletePlayer, deleteTeamRegister, teamRegisterListAll, TeamRegisterWithAllInclude } from '@/services/playerService';
import FormSetPlayer from './FormSetPlayer';
import FormSetRegisterTeam from './FormSetRegisterTeam';
import ValidationRegisterTeam from './ValidationRegisterTeam';

const RegisterTeamDisplay = async ({ eventId }: { eventId: string }) => {
    const res = await teamRegisterListAll();

    const teams: TeamRegisterWithAllInclude[] = !res.isErrored && res.data;

    return (
        <div className="mt-5 w-full">
            <h2 className="text-2xl font-bold my-5">Liste des demandes de création d'équipes</h2>
            <div className="flex flex-wrap gap-5">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <Card key={team.id} className="p-5">
                            <CardHeader>
                                <CardTitle>{team.name}</CardTitle>
                                <p>{team.players.length}/5 Membres</p>
                                <CardDescription className="whitespace-pre-wrap">{team.registerContext}</CardDescription>
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
                                                    <FormSetPlayer playerProps={player} teamRegisterId={team.id} eventId={team.eventId} />
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
                                <FormSetPlayer teamRegisterId={team.id} eventId={team.eventId} />
                                <ValidationRegisterTeam teamProps={team} />
                                <FormSetRegisterTeam teamProps={team} eventId={eventId} />
                                <DeleteAction
                                    id={team.id}
                                    title="Supprimer cette équipe"
                                    description="Voulez-vous vraiment supprimer cette équipe ? Les membres associés seront également supprimés. Cette action est irréversible."
                                    messageValidation="Equipe supprimée"
                                    fnAction={deleteTeamRegister}
                                />
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>Aucune demande en cours</p>
                )}
            </div>
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default RegisterTeamDisplay;
