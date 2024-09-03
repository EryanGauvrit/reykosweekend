import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export const SignupButton = ({ className, classNameText }: { className?: string; classNameText?: string }) => {
    return (
        <Link href="/auth/signup" className={clsx(buttonVariants({ variant: 'outline' }), className)}>
            <UserPlus />
            <p className={`${classNameText} mx-2`}>Créer un compte</p>
        </Link>
    );
};
