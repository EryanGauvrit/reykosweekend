'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Button, ButtonProps, buttonVariants } from '../ui/button';

interface ButtonBurgerProps extends ButtonProps {
    isOpen?: boolean;
    size?: 'default' | 'sm' | 'lg';
}

const ButtonBurger = React.forwardRef<HTMLButtonElement, ButtonBurgerProps>(
    ({ onClick, className, variant, size = 'default', tooltip, asChild = true, isOpen = true, ...props }, ref) => {
        const [open, setOpen] = useState(isOpen);

        size = !size ? 'default' : size;

        useEffect(() => {
            setOpen(isOpen);
        }, [isOpen]);

        if (size === 'sm' || size === 'default') {
            return (
                <Button
                    onClick={(e) => {
                        setOpen(!open);
                        if (onClick) {
                            onClick(e);
                        }
                    }}
                    className={clsx(buttonVariants({ variant, size: 'default', className }), `flex flex-col gap-[3px]`)}
                    ref={ref}
                    {...props}
                >
                    <span className={`h-[3px] w-5 bg-foreground duration-300 ${open ? `transform rotate-45 translate-y-1.5` : ''}`}></span>
                    <span className={`h-[3px] w-5 bg-foreground duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span
                        className={`h-[3px] w-5 bg-foreground duration-300 ${open ? `transform -rotate-45 -translate-y-1.5` : ''}`}
                    ></span>
                </Button>
            );
        }
        return (
            <Button
                onClick={(e) => {
                    setOpen(!open);
                    if (onClick) {
                        onClick(e);
                    }
                }}
                className={clsx(buttonVariants({ variant, size: 'default', className }), `flex flex-col gap-[7px]`)}
                ref={ref}
                {...props}
            >
                <span
                    className={`h-[2px] w-[30px] bg-foreground duration-300 ${open ? `transform rotate-45 translate-y-[9px]` : ''}`}
                ></span>
                <span className={`h-[2px] w-[30px] bg-foreground duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
                <span
                    className={`h-[2px] w-[30px] bg-foreground duration-300 ${open ? `transform -rotate-45 -translate-y-[9px]` : ''}`}
                ></span>
            </Button>
        );
    },
);
ButtonBurger.displayName = 'ButtonBurger';
export default ButtonBurger;
