import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { formatStartEndDate } from '@/lib/utils';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import RegisterForm from './RegisterForm';
import { add } from 'date-fns';

const page = async () => {
    const { data, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    if (!data || isErrored) {
        return <NoEventPlannified />;
    }

    return (
        <main className="flex-1 flex flex-col items-center my-5">
            <NextEventCountDown startDate={add(data.startDate, { days: -1 })} title="Fin des inscriptions dans" className="mb-5" />
            <Card className="px-10 py-5">
                <CardHeader className="flex flex-col items-center gap-2">
                    <h1 className="text-2xl font-bold">Inscription: {data?.title}</h1>
                    <h2 className="text-lg font-semibold">{formatStartEndDate(new Date(data.startDate), new Date(data.dueDate))}</h2>
                    <CardDescription>Remplisser le formulaire ci-dessous pour faire une demande d'inscription.</CardDescription>
                </CardHeader>
                <RegisterForm eventId={data.id} />
            </Card>
        </main>
    );
};

export default page;
