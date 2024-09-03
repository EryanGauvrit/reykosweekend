import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const DisplayValueUpdateTrigger = ({ children, className }: Props) => {
    return <div className={cn('flex items-center gap-4', className)}>{children}</div>;
};

export default DisplayValueUpdateTrigger;
