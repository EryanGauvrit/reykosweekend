'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { QueryResponse } from '@/services/queryService';
import { ButtonVariants } from '@/types/props/variant';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import ButtonSubmit from './ButtonSubmit';
import Loader from './Loader';

type DialogFormProps = {
    title: string;
    description: string;
    textSubmit: React.ReactNode;
    textOpen: React.ReactNode;
    children: React.ReactNode;
    variant?: ButtonVariants;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    actionFn: (formData: FormData) => Promise<QueryResponse>;
    className?: string;
    opacityTrigger?: number;
    classNameTrigger?: string;
};

const DialogForm = ({
    children,
    title,
    description,
    textOpen,
    textSubmit,
    variant,
    size,
    actionFn,
    className,
    opacityTrigger,
    classNameTrigger,
}: DialogFormProps) => {
    const { status } = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen}>
            {status === 'authenticated' && (
                <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                    <Button variant={variant} size={size} className={cn(`opacity-${opacityTrigger} min-w-10`, classNameTrigger)}>
                        {textOpen}
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className={cn(`max-w-4xl`, className)} defaultCancelButton={false}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <DialogClose
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogHeader>
                <form
                    action={(formData) => {
                        actionFn(formData)
                            .then((res) => {
                                if (res.isErrored) {
                                    toast({ variant: res.variant, title: res.title, description: res.data });
                                    return;
                                } else {
                                    toast({ variant: res.variant, title: res.title, description: res.description });
                                    setIsOpen(false);
                                }
                                router.refresh();
                            })
                            .catch((err) => {
                                toast({ variant: 'destructive', title: 'Erreur', description: err });
                            });
                    }}
                    className="flex flex-col gap-4 py-6"
                >
                    {children}
                    <DialogFooter>
                        <DialogClose asChild>
                            <ButtonSubmit type="submit">{textSubmit}</ButtonSubmit>
                        </DialogClose>
                    </DialogFooter>
                    <Loader />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogForm;
