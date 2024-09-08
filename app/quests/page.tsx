import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { Card } from '@/components/ui/card';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import { isFuture, isPast } from 'date-fns';
import { ShieldQuestion } from 'lucide-react';
import QuestsDisplay from '../dashboard/quests/QuestsDisplay';

const page = async () => {
    const { data: event, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    if (!event || isErrored) {
        return <NoEventPlannified />;
    }

    return (
        <main className="flex-1 my-10 flex flex-col items-center gap-10 container">
            {isFuture(event.startDate) && <NextEventCountDown startDate={event.startDate} />}
            {isPast(event.startDate) && (
                <>
                    <h1 className="text-3xl uppercase font-bold flex items-center gap-2">
                        <ShieldQuestion size={40} />
                        Quêtes en jeux
                    </h1>
                    <Card className="px-10 py-5">
                        <QuestsDisplay eventId={event.id} />
                    </Card>
                </>
            )}
        </main>
    );
};

export default page;
