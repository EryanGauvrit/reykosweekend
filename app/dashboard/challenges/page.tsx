import prisma from '@/lib/prisma';
import { getNextEvent } from '@/services/eventService';
import { auth } from 'auth';
import { Swords } from 'lucide-react';
import { redirect } from 'next/navigation';
import FormSetQuest from '../quests/FormSetQuest';
import QuestsDisplay from '@/components/context/QuestsDisplay';
import FormSetChallenge from './FormSetChallenge';
import ChallengeAdminDisplay from './ChallengeAdminDisplay';

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
        <main>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Swords size={26} />
                Gestion des challenges
            </h1>

            {isErrored ? (
                <div className="text-destructive">Erreur lors de la récupération de l'évènement</div>
            ) : (
                <div className="p-4 col-span-2 max-w-5xl w-full m-auto mt-10">
                    <FormSetChallenge eventId={data.id} />
                    <ChallengeAdminDisplay eventId={data.id} />
                </div>
            )}
        </main>
    );
};

export default page;
