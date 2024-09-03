'use client';

import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

type LoaderProps = {
    className?: string;
    inComponent?: boolean;
    withoutPending?: boolean;
};

const Loader = ({ className, inComponent, withoutPending }: LoaderProps) => {
    const { pending } = useFormStatus();

    return (
        <>
            {withoutPending ? (
                <LoaderComponent className={className} inComponent={inComponent} />
            ) : (
                pending && <LoaderComponent className={className} inComponent={inComponent} />
            )}
        </>
    );
};

export default Loader;

const LoaderComponent = ({ className, inComponent }: LoaderProps) => {
    return (
        <div
            className={cn(
                `flex justify-center items-center h-full w-full ${!inComponent ? 'fixed top-0 left-0 z-50 bg-black/55 ' : ''}`,
                className,
            )}
        >
            <LoaderCircle className="animate-spin w-24 h-24" size={24} />
        </div>
    );
};
