import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';

const page = async () => {
    const { data, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    if (!data || isErrored) {
        return <NoEventPlannified />;
    }

    return <main className="flex-1">{data.startDate > new Date() && <NextEventCountDown startDate={data.startDate} />}</main>;
};

export default page;
