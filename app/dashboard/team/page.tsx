import prisma from '@/lib/prisma';
import { auth } from 'auth';
import { Users } from 'lucide-react';
import { redirect } from 'next/navigation';
import FormSetCollaborator from './FormSetCollaborator';
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
    return (
        <section>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Users size={26} />
                Gestion de l'équipe
            </h1>
            <div className="m-auto max-w-5xl w-full mt-10 flex flex-col gap-5">
                <div>{<FormSetCollaborator />}</div>
                <TeamDisplay />
            </div>
        </section>
    );
};

export default page;
