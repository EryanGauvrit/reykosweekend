'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

export const LoginButton = ({ className, classNameText }: { className?: string; classNameText?: string }) => {
    return (
        <Button onClick={() => signIn()} className={clsx(buttonVariants({ variant: 'secondary' }), className)}>
            <LogIn className="mr-2 h-4 w-4" />
            <p className={`${classNameText}`}>Se connecter</p>
        </Button>
    );
};
