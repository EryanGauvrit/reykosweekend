import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { formatStartEndDate } from '@/lib/utils';
import { nextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import RegisterForm from './RegisterForm';

const page = async () => {
    const res = await nextEvent();

    const event = res.data as Event;

    if (!event || !event.id) {
        return (
            <main className="flex-1 flex flex-col items-center">
                <section className="flex flex-col items-center gap-2">
                    <h1 className="text-3xl font-bold">Aucun évènement à venir</h1>
                    <p>Il n'y a aucun évènement prévu pour le moment.</p>
                </section>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col items-center my-5">
            <Card className="px-10 py-5">
                <CardHeader className="flex flex-col items-center gap-2">
                    <h1 className="text-2xl font-bold">Inscription: {event?.title}</h1>
                    <h2 className="text-lg font-semibold">{formatStartEndDate(new Date(event.startDate), new Date(event.dueDate))}</h2>
                    <CardDescription>Remplisser le formulaire ci-dessous pour faire une demande d'inscription.</CardDescription>
                </CardHeader>
                <RegisterForm eventId={event.id} />
            </Card>
        </main>
    );
};

export default page;
