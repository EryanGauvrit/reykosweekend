import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { auth } from 'auth';
import { Shield } from 'lucide-react';
import { redirect } from 'next/navigation';
import DeleteUserAction from './DeleteUserAction';
import FormSetStreamer from './FormSetStreamer';
import DeleteAction from '@/components/basics/DeleteAction';
import { deleteStreamer } from '@/services/streamerService';

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
    const streamerList = await prisma.streamer.findMany();
    return (
        <section>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Shield size={26} />
                Gestion des streamers
            </h1>
            <div className="max-w-xl m-auto w-full mt-10 flex flex-col gap-5">
                <div className="max-w-sm">
                    <FormSetStreamer />
                </div>
                <Table className="w-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">#</TableHead>
                            <TableHead className="w-[100px]">Nom</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {streamerList.length > 0 ? (
                            streamerList.map((streamer) => (
                                <TableRow key={streamer.id}>
                                    <TableCell>{streamer.id}</TableCell>
                                    <TableCell>{streamer.name}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <FormSetStreamer streamer={streamer} />
                                        <DeleteAction
                                            id={streamer.id}
                                            fnAction={deleteStreamer}
                                            description="Voulez-vous vraiment supprimer ce streamer ?"
                                            title="Suppression d\'un streamer"
                                            messageValidation="Le streamer a bien été supprimé"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>Aucun streamer</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default page;
