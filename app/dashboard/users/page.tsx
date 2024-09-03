import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { auth } from 'auth';
import { Shield } from 'lucide-react';
import { redirect } from 'next/navigation';
import DeleteUserAction from './DeleteUserAction';
import FormAddUser from './FormAddUser';

const page = async () => {
    const userList = await prisma.user.findMany();
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
                <Shield size={26} />
                Gestion des administrateurs
            </h1>
            <div className="max-w-xl m-auto w-full mt-10 flex flex-col gap-5">
                <div className="max-w-sm">
                    <FormAddUser />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Adresse mail</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {session?.user && session.user.email !== user.email ? (
                                        <DeleteUserAction id={user.id} />
                                    ) : (
                                        <p className="text-warning">Vous ne pouvez pas supprimer votre propre compte</p>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default page;
