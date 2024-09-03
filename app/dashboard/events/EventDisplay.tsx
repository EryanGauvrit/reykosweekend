import DeleteAction from '@/components/basics/DeleteAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deleteEvent, eventList, EventWithCategory } from '@/services/eventService';
import Image from 'next/image';
import FormSetEvent from './FormSetEvent';

const EventDisplay = async () => {
    const res = await eventList();

    const events: EventWithCategory[] = !res.isErrored && res.data;

    return (
        <div className="mt-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Affiche</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>
                                    {event.image ? (
                                        <Image src={event.image} alt={event.title} width={50} height={50} />
                                    ) : (
                                        <p>Aucune image</p>
                                    )}
                                </TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.author}</TableCell>
                                <TableCell>{event.category.name}</TableCell>
                                <TableCell>{event.isShow ? 'spectacle' : 'autre'}</TableCell>
                                <TableCell>
                                    <FormSetEvent event={event} />
                                    <DeleteAction
                                        id={event.id}
                                        title="Supprimer cet événement"
                                        description="Voulez-vous vraiment supprimer cet événement ? Les dates associées seront également supprimées. Cette action est irréversible."
                                        messageValidation="Evénement supprimé"
                                        fnAction={deleteEvent}
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

export default EventDisplay;
