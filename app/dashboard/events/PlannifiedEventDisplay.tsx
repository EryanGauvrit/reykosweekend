import DeleteAction from '@/components/basics/DeleteAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deletePlannifiedEvent, plannifiedEventList, PlannifiedEventWithInclude } from '@/services/eventService';
import { compareAsc, format } from 'date-fns';
import FormSetPlannifiedEvent from './FormSetPlannifiedEvent';

const PlannifiedEventDisplay = async () => {
    const res = await plannifiedEventList();

    const plannifiedEvents: PlannifiedEventWithInclude[] = !res.isErrored && res.data;
    let nextPlannifiedEvents: PlannifiedEventWithInclude[] = [];
    let pastPlannifiedEvents: PlannifiedEventWithInclude[] = [];

    if (plannifiedEvents) {
        nextPlannifiedEvents = plannifiedEvents.filter((event) => compareAsc(new Date(), event.startDate) < 0);
        pastPlannifiedEvents = plannifiedEvents.filter((event) => compareAsc(new Date(), event.startDate) >= 0);
    }

    return (
        <div className="mt-5 grid grid-cols-2">
            <div className="p-4">
                <h3 className="text-lg font-bold">Prochaines dates</h3>
                <PlannifiedEventSort plannifiedEvents={nextPlannifiedEvents} />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold">Dates passées (Archives)</h3>
                <PlannifiedEventSort plannifiedEvents={pastPlannifiedEvents} />
            </div>
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default PlannifiedEventDisplay;

const PlannifiedEventSort = ({ plannifiedEvents }: { plannifiedEvents: PlannifiedEventWithInclude[] }) => {
    return (
        <>
            {plannifiedEvents[0] ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead>Date début</TableHead>
                            <TableHead>Date fin</TableHead>
                            <TableHead>Lieu</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plannifiedEvents.length > 0 ? (
                            plannifiedEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.event.title}</TableCell>
                                    <TableCell>{format(event.startDate || '', 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{format(event.endDate || '', 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{event.location.name}</TableCell>
                                    <TableCell>{event.event.isShow ? 'spectacle' : 'autre'}</TableCell>
                                    <TableCell>
                                        <FormSetPlannifiedEvent event={event} />
                                        <DeleteAction
                                            id={event.id}
                                            title="Supprimer cette date"
                                            description="Voulez-vous vraiment supprimer cette date ?"
                                            messageValidation="Date supprimée"
                                            fnAction={deletePlannifiedEvent}
                                            className="ml-2"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>Aucune date enregistré</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-warning font-bold">Aucune date enregistrée</p>
            )}
        </>
    );
};
