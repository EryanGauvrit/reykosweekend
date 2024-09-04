import DeleteAction from '@/components/basics/DeleteAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { deleteEvent, eventList } from '@/services/eventService';
import { Event } from '@prisma/client';
import FormSetEvent from './FormSetEvent';

const EventDisplay = async () => {
    const res = await eventList();

    const events: Event[] = !res.isErrored && res.data;

    return (
        <div className="mt-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Date de début</TableHead>
                        <TableHead>Date de fin</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{formatDate(event.startDate, 'PP - kk:mm')}</TableCell>
                                <TableCell>{formatDate(event.dueDate, 'PP - kk:mm')}</TableCell>
                                <TableCell>
                                    <FormSetEvent event={event} />
                                    <DeleteAction
                                        id={event.id}
                                        title="Supprimer cet événement"
                                        description="Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible."
                                        messageValidation="Evénement supprimé"
                                        fnAction={deleteEvent}
                                        className="ml-2"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>Aucun évènement enregistré</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default EventDisplay;
