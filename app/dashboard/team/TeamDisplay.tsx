import DeleteAction from '@/components/basics/DeleteAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { collaboratorList, deleteCollaborator } from '@/services/collaboratorService';
import { Collaborator } from '@prisma/client';
import Image from 'next/image';
import FormSetCollaborator from './FormSetCollaborator';

const TeamDisplay = async () => {
    const res = await collaboratorList();

    const collaborators: Collaborator[] = !res.isErrored && res.data;

    return (
        <div className="mt-5 w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Adresse email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Rôle(s)</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {collaborators.length > 0 ? (
                        collaborators.map((collaborator) => (
                            <TableRow key={collaborator.id}>
                                <TableCell>
                                    {collaborator.image ? (
                                        <Image
                                            src={collaborator.image}
                                            alt={`${collaborator.lastname} - ${collaborator.firstname}`}
                                            width={50}
                                            height={50}
                                        />
                                    ) : (
                                        <p>Aucune image</p>
                                    )}
                                </TableCell>
                                <TableCell>{collaborator.lastname}</TableCell>
                                <TableCell>{collaborator.firstname}</TableCell>
                                <TableCell>{collaborator.email}</TableCell>
                                <TableCell>{collaborator.phone}</TableCell>
                                <TableCell>{collaborator.role}</TableCell>
                                <TableCell>
                                    <FormSetCollaborator collaborator={collaborator} />
                                    <DeleteAction
                                        id={collaborator.id}
                                        title="Supprimer cet événement"
                                        description="Voulez-vous vraiment supprimer cet événement ? Les dates associées seront également supprimées. Cette action est irréversible."
                                        messageValidation="Evénement supprimé"
                                        fnAction={deleteCollaborator}
                                        className="ml-2"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>Aucun événement enregistré</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default TeamDisplay;
