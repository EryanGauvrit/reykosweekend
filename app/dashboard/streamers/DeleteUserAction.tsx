'use client';

import AlertDialogComp from '@/components/basics/AlertDialog';
import Loader from '@/components/basics/Loader';
import { useToast } from '@/components/ui/use-toast';
import { deleteUser } from '@/services/userService';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteUserAction = ({ id }: { id: string }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <AlertDialogComp
                title="Supprimer l'utilisateur"
                description="Voulez-vous vraiment supprimer cet utilisateur ?"
                confirmAction={async () => {
                    setIsLoading(true);
                    const res = await deleteUser(id);
                    if (!res.isErrored) {
                        toast({ variant: 'success', title: 'Utilisateur supprimé' });
                        router.refresh();
                    } else {
                        toast({ variant: res.variant, title: res.title, description: res.data });
                    }
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1500);
                }}
                closeLabel="Annuler"
                confirmLabel="Supprimer"
                openLabel={<Trash size={20} />}
                size="icon"
                variant="destructive"
            />
            {isLoading && <Loader withoutPending />}
        </>
    );
};

export default DeleteUserAction;
