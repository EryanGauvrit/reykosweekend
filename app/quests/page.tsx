import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import { isFuture, isPast } from 'date-fns';

const page = async () => {
    const { data, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    if (!data || isErrored) {
        return <NoEventPlannified />;
    }

    return (
        <main className="flex-1 my-10">
            {isFuture(data.startDate) && <NextEventCountDown startDate={data.startDate} />}
            {isPast(data.startDate) && <h1>Quests</h1>}
        </main>
    );
};

export default page;
