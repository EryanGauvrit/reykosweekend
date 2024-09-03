import { getUserByEmail } from '@/services/userService';
import { User } from '@prisma/client';
import { auth } from 'auth';
import { UserCog } from 'lucide-react';
import { notFound } from 'next/navigation';
import PersonnalInformations from './PersonnalInformations';

const page = async () => {
    const user = (await auth())?.user;
    if (!user) {
        return notFound();
    }

    const response = await getUserByEmail(user.email as string);

    if (response.isErrored) {
        console.error('Failed to fetch user data');
        notFound();
    }

    const userData = (await response.data) as User;

    return (
        <>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <UserCog size={26} />
                Mon compte
            </h1>
            <p>Bienvenue sur votre espace personnel, vous pouvez ici consulter et modifier vos informations personnelles.</p>
            <PersonnalInformations user={userData} userSession={user} />
        </>
    );
};

export default page;
