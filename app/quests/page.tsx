import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { Card } from '@/components/ui/card';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import { isFuture, isPast } from 'date-fns';
import { ShieldQuestion } from 'lucide-react';
import QuestsDisplay from '../../src/components/context/QuestsDisplay';

const page = async () => {
    const { data: event, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    if (!event || isErrored) {
        return <NoEventPlannified />;
    }

    return (
        <main className="flex-1 my-10 container">
            {isFuture(event.startDate) && <NextEventCountDown startDate={event.startDate} />}
            {isPast(event.startDate) && (
                <section className="flex flex-col items-center gap-10">
                    <h1 className="text-3xl uppercase font-bold flex items-center gap-2">
                        <ShieldQuestion size={40} />
                        Quêtes en jeu
                    </h1>
                    <p className="max-w-3xl m-auto">
                        Voici les quêtes en jeu pour l'évènement <strong>{event.title}</strong>.
                        <br />
                        Chaque équipe doit avoir sa propre stratégie pour les réaliser. Certaines se réalisent ne avançant dans le jeu de
                        manière "standard", d'autres nécessitent réflexion, stratégie et optmisation.
                    </p>
                    <p>⚠️ Pour les faire valider, contactes un modérateur en jeu ! ⚠️</p>
                    <Card className="px-10 py-5 max-w-5xl">
                        <QuestsDisplay eventId={event.id} />
                    </Card>
                </section>
            )}
        </main>
    );
};

export default page;
