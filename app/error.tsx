'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { useEffect } from 'react';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex-1 flex flex-col justify-center gap-4">
            <h1 className={cn('text-4xl text-center text-destructive')}>Erreur inconnue</h1>
            <p className="text-center">Une erreur inconnue s'est produite. Veuillez réessayer plus tard.</p>
            <div className="flex gap-4 justify-center">
                <Button variant="warning" onClick={reset} className="w-52">
                    Réessayer
                </Button>
                <a className={clsx(buttonVariants({ variant: 'success' }), 'w-52')} href={'/'}>
                    Accueil
                </a>
            </div>
        </main>
    );
};

export default Error;
