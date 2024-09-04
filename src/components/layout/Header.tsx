'use client';

import { isPhoneScreen } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import logo from '../../../public/logo.png';
import ButtonBurger from '../basics/ButtonBurger';
import NavLink from '../basics/NavLink';

export const Header = (props: { children: React.ReactNode }) => {
    const routes = [
        { href: '/', text: 'Accueil' }, // Ranking, program, presentation
        { href: '/rules', text: 'Règles' },
        { href: '/quests', text: 'Quêtes' },
        { href: '/registration', text: 'Inscription' },
        { href: '/contact', text: 'Nous Contacter' },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const phoneSceen = isPhoneScreen();
        if (phoneSceen) {
            // only add the event listener when the dropdown is opened
            if (!isMenuOpen) return;
            function handleClick(event: MouseEvent) {
                if (!ref.current?.contains(event.target)) {
                    setIsMenuOpen(false);
                }
            }
            window.addEventListener('click', handleClick);
            // clean up
            return () => window.removeEventListener('click', handleClick);
        } else {
            setIsMenuOpen(true);
        }
    }, [isMenuOpen, ref]);

    return (
        <header
            ref={ref}
            className={`text-foreground ${isMenuOpen ? 'bg-primary ' : 'bg-transparent'} md:bg-transparent flex flex-col md:flex-row justify-around items-center md:py-2 md:px-6 md:w-full gap-2`}
        >
            <div className="flex justify-between md:justify-around items-center w-full md:w-auto px-5 md:px-2 py-5">
                <Link href={'/'}>
                    <Image priority src={logo} alt="logo" width={325} height={75} className="h-24 object-contain" />
                </Link>
                <ButtonBurger
                    className="md:hidden bg-transparent hover:bg-transparent hover:scale-110 duration-200"
                    size={'lg'}
                    onClick={() => setIsMenuOpen((b) => !b)}
                    isOpen={isMenuOpen}
                />
            </div>
            {isMenuOpen && (
                <>
                    <nav className="flex flex-col md:items-center md:flex-row w-full md:w-auto list-none bg-secondary overflow-hidden md:rounded-full md:h-full md:max-h-14 md:opacity-90">
                        {routes.map((route, index) => (
                            <NavLink
                                key={index}
                                href={route.href}
                                className="px-10 text-lg md:text-base py-4 font-bold md:font-normal md:hover:bg-primary md:hover:text-accent-foreground text-foreground duration-300 md:text-center border-t border-t-black/30 md:border-none md:py-10"
                                activeClassName="bg-success text-success-foreground md:py-10"
                            >
                                {route.text}
                            </NavLink>
                        ))}
                    </nav>
                    {props.children}
                </>
            )}
        </header>
    );
};
