import NoEventPlannified from '@/components/context/NoEventPlannified';
import prisma from '@/lib/prisma';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import { auth } from 'auth';
import { ShieldQuestion } from 'lucide-react';
import { redirect } from 'next/navigation';
import QuestsDisplay from '../../../src/components/context/QuestsDisplay';
import FormSetQuest from './FormSetQuest';

const page = async () => {
    const session = await auth();

    const userAuth = await prisma.user.findUnique({
        where: {
            email: session?.user.email,
        },
    });

    if (!userAuth || !userAuth.isAdmin) {
        redirect('/dashboard');
    }

    const { data, isErrored }: { data?: Event; isErrored: boolean } = await getNextEvent();

    if (!data) {
        return <NoEventPlannified social={false} />;
    }

    return (
        <section>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <ShieldQuestion size={26} />
                Gestion des quêtes
            </h1>

            {isErrored ? (
                <div className="text-destructive mt-10">Erreur lors de la récupération de l'évènement</div>
            ) : (
                <div className="p-4 col-span-2 max-w-5xl w-full m-auto mt-10">
                    <FormSetQuest eventId={data.id} />
                    <QuestsDisplay eventId={data.id} />
                </div>
            )}
        </section>
    );
};

export default page;
