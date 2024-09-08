import { CalendarCog } from 'lucide-react';
import EventDisplay from './EventDisplay';
import FormSetEvent from './FormSetEvent';

const page = async () => {
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <CalendarCog size={26} />
                Gestion des évènements
            </h1>
            <div className="p-4 col-span-2 max-w-4xl w-full m-auto">
                <h2 className="text-xl font-bold my-5 flex justify-between items-center gap-2">
                    Évènements
                    <FormSetEvent />
                </h2>
                <EventDisplay />
            </div>
        </section>
    );
};

export default page;
