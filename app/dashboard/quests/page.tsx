import prisma from '@/lib/prisma';
import { getNextEvent } from '@/services/eventService';
import { auth } from 'auth';
import { Shield } from 'lucide-react';
import { redirect } from 'next/navigation';
import FormSetQuest from './FormSetQuest';
import QuestsDisplay from './QuestsDisplay';

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

    const { data, isErrored } = await getNextEvent();

    return (
        <section>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Shield size={26} />
                Gestion des quêtes
            </h1>

            {isErrored ? (
                <div className="text-destructive">Erreur lors de la récupération de l'évènement</div>
            ) : (
                <div className="p-4 col-span-2 max-w-4xl w-full m-auto">
                    <FormSetQuest eventId={data.id} />
                    <QuestsDisplay eventId={data.id} />
                </div>
            )}
        </section>
    );
};

export default page;
