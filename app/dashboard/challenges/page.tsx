import prisma from '@/lib/prisma';
import { getNextEvent } from '@/services/eventService';
import { auth } from 'auth';
import { Swords } from 'lucide-react';
import { redirect } from 'next/navigation';

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
                <section className="mt-10 flex flex-col gap-5"></section>
            )}
        </main>
    );
};

export default page;
