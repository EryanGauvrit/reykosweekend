import { CalendarCog } from 'lucide-react';
import CategoryDisplay from './CategoryDisplay';
import EventDisplay from './EventDisplay';
import FormAddCategory from './FormAddCategory';
import FormAddLocation from './FormAddLocation';
import FormSetEvent from './FormSetEvent';
import HelperDialog from './HelperDialog';
import LocationDisplay from './LocationDisplay';
import FormSetPlannifiedEvent from './FormSetPlannifiedEvent';
import PlannifiedEventDisplay from './PlannifiedEventDisplay';

const page = async (props: any) => {
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <CalendarCog size={26} />
                Gestion des évènements
            </h1>
            <p> Gestion des évènements, lieux, catégories et dates. </p>
            <HelperDialog />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 col-span-2">
                    <h2 className="text-xl font-bold my-5 flex justify-between items-center gap-2">
                        Évènements
                        <FormSetEvent />
                    </h2>
                    <EventDisplay />
                </div>
                <div className="p-4 flex flex-col gap-10">
                    <div>
                        <h2 className="text-xl font-bold my-5 flex justify-between items-center gap-2">
                            Lieux
                            <FormAddLocation />
                        </h2>
                        <LocationDisplay />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold my-5 flex justify-between items-center gap-2">
                            Catégories
                            <FormAddCategory />
                        </h2>
                        <CategoryDisplay />
                    </div>
                </div>
            </div>

            <div className="gap-4 mt-10 mb-5">
                <h2 className="text-xl font-bold flex items-center gap-10">
                    Dates
                    <FormSetPlannifiedEvent />
                </h2>
                <PlannifiedEventDisplay />
            </div>
        </section>
    );
};

export default page;
