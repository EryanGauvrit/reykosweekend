import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';

const ButtonSubmit = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, tooltip, asChild = false, children, ...props }, ref) => {
        const { pending } = useFormStatus();
        return (
            <Button
                disabled={pending}
                className={className}
                variant={variant}
                size={size}
                tooltip={tooltip}
                asChild={asChild}
                ref={ref}
                {...props}
            >
                {pending ? <Loader2 className="animate-spin" /> : children}
            </Button>
        );
    },
);

ButtonSubmit.displayName = 'ButtonSubmit';

export default ButtonSubmit;
