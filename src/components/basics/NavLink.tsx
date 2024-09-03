'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
};

const NavLink = React.forwardRef(({ children, href, className, activeClassName }: NavLinkProps, ref) => {
    const pathname = usePathname();
    return (
        <Link href={href} className={cn(className, `${pathname === href ? activeClassName : ''}`)}>
            {children}
        </Link>
    );
});

NavLink.displayName = 'NavLink';
export default NavLink;
