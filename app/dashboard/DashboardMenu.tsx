'use client';

import ButtonBurger from '@/components/basics/ButtonBurger';
import NavLink from '@/components/basics/NavLink';
import { useEffect, useState } from 'react';
import { displayMenuItem, Item } from './displayMenuItem';

const DashboardMenu = () => {
    const [itemsMenu, setItemsMenu] = useState<Item[]>([]);
    const [collapsed, setCollapsed] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
        const fetchItemsMenu = async () => {
            const res = await displayMenuItem();
            setItemsMenu(res);
        };

        fetchItemsMenu();
    }, []);
    return (
        <>
            {showMenu && (
                <div
                    className={`min-w-60 h-full ${collapsed ? '-translate-x-full' : 'translate-x-0'} transform transition-transform duration-300`}
                >
                    <div className="flex items-center px-4 h-16 mt-8 pl-6">
                        <h1 className="text-2xl">Menu</h1>
                    </div>
                    <ul className="flex flex-col items-center">
                        {itemsMenu.map((item, index) => (
                            <li key={index} className={`flex items-center justify-start w-full h-16 cursor-pointer`}>
                                <NavLink
                                    href={item.href}
                                    className="w-full h-full px-6 flex items-center gap-2 hover:bg-success hover:text-success-foreground duration-300"
                                    activeClassName="bg-secondary text-secondary-foreground"
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ButtonBurger
                className={`px-4 mt-14 ml-2`}
                onClick={() => {
                    if (!showMenu) {
                        setShowMenu(true);
                        setTimeout(() => {
                            setCollapsed(!collapsed);
                        }, 10);
                        return;
                    }
                    setCollapsed(!collapsed);
                    setTimeout(() => {
                        setShowMenu(!showMenu);
                    }, 300);
                }}
                variant={'ghost'}
            />
        </>
    );
};

export default DashboardMenu;
