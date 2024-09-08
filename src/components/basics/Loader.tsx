'use client';

import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type LoaderProps = {
    className?: string;
    inComponent?: boolean;
    withoutPending?: boolean;
    size?: number;
};

const Loader = ({ className, inComponent, withoutPending, size }: LoaderProps) => {
    const { pending } = useFormStatus();

    return (
        <>
            {withoutPending ? (
                <LoaderComponent className={className} inComponent={inComponent} size={size} />
            ) : (
                pending && <LoaderComponent className={className} inComponent={inComponent} size={size} />
            )}
        </>
    );
};

export default Loader;

const LoaderComponent = ({ className, inComponent, size }: LoaderProps) => {
    return (
        <div
            className={cn(
                `flex justify-center items-center h-full w-full ${!inComponent ? 'fixed top-0 left-0 z-50 bg-black/55 ' : ''}`,
                className,
            )}
        >
            <LoaderCircle className="animate-spin" size={size ?? 96} />
        </div>
    );
};
