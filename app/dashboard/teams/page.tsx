import prisma from '@/lib/prisma';
import { nextEvent } from '@/services/eventService';
import { auth } from 'auth';
import { Users } from 'lucide-react';
import { redirect } from 'next/navigation';
import RegisterTeamDisplay from './RegisterTeamDisplay';
import TeamDisplay from './TeamDisplay';

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

    const { data, isErrored } = await nextEvent();

    return (
        <main>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Users size={26} />
                Gestion des équipes
            </h1>

            {isErrored ? (
                <div className="text-destructive">Erreur lors de la récupération de l'évènement</div>
            ) : (
                <section className="mt-10 flex flex-col gap-5">
                    <RegisterTeamDisplay eventId={data.id} />
                    <TeamDisplay eventId={data.id} />
                </section>
            )}
        </main>
    );
};

export default page;
