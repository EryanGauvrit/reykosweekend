'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';
import { User as UserIcon } from 'lucide-react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { displayMenuItem, Item } from '../../../app/dashboard/displayMenuItem';
import NavLink from '../basics/NavLink';

type UserPannelProps = {
    user: User;
};
const UserPannel = ({ user }: UserPannelProps) => {
    const [itemsMenu, setItemsMenu] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const items = await displayMenuItem();
            setItemsMenu(items);
        };
        fetchItems();
    }, []);
    return (
        <React.Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex items-center gap-2">
                    <Avatar>
                        <AvatarImage className="object-cover object-center" src={user.image || undefined} alt={`${user.name}`} />
                        <AvatarFallback className="bg-secondary text-foreground hover:bg-foreground hover:text-primary transition-colors opacity-90">
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded flex flex-col gap-2 mr-6 p-4">
                    <DropdownMenuLabel>
                        <div className="flex flex-col gap-2">
                            <p className="text-center">{`${user.email}`}</p>
                        </div>
                    </DropdownMenuLabel>
                    {/* <DropdownMenuSeparator /> */}
                    {itemsMenu.map((item, index) => (
                        <DropdownMenuItem key={index} asChild className="cursor-pointer">
                            <NavLink
                                href={item.href}
                                className="w-full h-full px-4 flex items-center gap-2 hover:bg-success hover:text-success-foreground duration-300"
                                activeClassName="bg-secondary text-secondary-foreground"
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </NavLink>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className=" w-4/5 m-auto my-2" />
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Button
                            onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                            variant="destructive"
                            className="w-full"
                        >
                            Déconnexion
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:hidden">
                <CardHeader className="flex flex-col items-center p-2">
                    <Avatar>
                        <AvatarImage className="object-contain object-center" src={user.image || undefined} alt={`${user.email}`} />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-md font-bold">{`${user.email}`}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-around items-center gap-2">
                    <Link
                        href={'/dashboard'}
                        className={clsx(
                            buttonVariants({
                                variant: 'ghost',
                                className: 'w-full',
                            }),
                        )}
                    >
                        Tableau de bord
                    </Link>
                    <Button
                        onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                        variant="destructive"
                        className="w-full"
                    >
                        Déconnexion
                    </Button>
                </CardContent>
            </div>
        </React.Fragment>
    );
};

export default UserPannel;
