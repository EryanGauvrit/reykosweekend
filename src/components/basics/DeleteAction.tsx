'use client';

import AlertDialogComp from '@/components/basics/AlertDialog';
import Loader from '@/components/basics/Loader';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { deleteLocation } from '@/services/eventService';
import { QueryResponse } from '@/services/queryService';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteActionProps = {
    id: number;
    title: string;
    description: string;
    messageValidation: string;
    fnAction: (id: number) => Promise<QueryResponse>;
    className?: string;
};

const DeleteAction = ({ id, fnAction, title, description, messageValidation, className }: DeleteActionProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <AlertDialogComp
                title={title}
                description={description}
                confirmAction={async () => {
                    setIsLoading(true);
                    const res = await fnAction(id);
                    if (!res.isErrored) {
                        toast({ variant: 'success', title: messageValidation });
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
                className={cn('w-8 h-8', className)}
            />
            {isLoading && <Loader withoutPending />}
        </>
    );
};

export default DeleteAction;
