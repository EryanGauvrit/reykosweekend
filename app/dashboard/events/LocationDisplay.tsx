import DeleteAction from '@/components/basics/DeleteAction';
import { deleteLocation, locationList } from '@/services/eventService';
import { Location } from '@prisma/client';
import { ChevronRight } from 'lucide-react';

const LocationDisplay = async () => {
    const res = await locationList();

    const locations: Location[] = !res.isErrored && res.data;

    return (
        <div className="mt-5">
            {locations.length > 0 ? (
                <ul className="flex flex-col gap-5">
                    {locations.map((location, index) => (
                        <li key={index} className="flex justify-between gap-2 items-center">
                            <div className="flex items-center gap-2">
                                <ChevronRight size={20} className="inline-block" />
                                {location.name}
                            </div>
                            <DeleteAction
                                id={location.id}
                                title="Supprimer ce lieu"
                                description="Voulez-vous vraiment supprimer ce lieu ? Les dates associées seront également supprimées. Cette action est irréversible."
                                messageValidation="Lieu supprimé"
                                fnAction={deleteLocation}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun lieu enregistré</p>
            )}
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default LocationDisplay;
