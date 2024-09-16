import HeaderAuth from '@/components/auth/HeaderAuth';
import BgDesign from '@/components/layout/BgDesign';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import prisma from '@/lib/prisma';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { notoSans } from '../style/fonts/font';
import './globals.css';
import Provider from './provider';
import { Analytics } from '@vercel/analytics/react';

const TITLE = "The Reyko's Weekend : Events Minecraft Intensifs !";
const DESCRIPTION =
    "Reyko's Weekend organise des événements Minecraft intenses et uniques ! Génralement sur un week-end, ces événements sont l’occasion de se retrouver entre passionnés de Minecraft (ou pas 😜) pour partager des moments inoubliables !";

const getHomeSettings = async () => {
    return await prisma.webSiteSettings.findFirst({
        select: {
            title: true,
            description: true,
        },
    });
};

export const metadata: Metadata = {
    applicationName: (await getHomeSettings())?.title ?? TITLE,
    title: {
        default: (await getHomeSettings())?.title ?? TITLE,
        template: `%s - ${(await getHomeSettings())?.title ?? TITLE}`,
    },
    description: (await getHomeSettings())?.description ?? DESCRIPTION,
    robots: {
        index: false,
        follow: false,
    },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
            <body className={clsx(notoSans.className, 'bg-background h-full')} suppressHydrationWarning>
                <TooltipProvider>
                    <Provider>
                        <div className="flex flex-col min-h-screen">
                            <Header>
                                <HeaderAuth />
                            </Header>
                            <Analytics />
                            {children}
                            <Footer />
                        </div>
                        <BgDesign />
                        <Toaster />
                    </Provider>
                </TooltipProvider>
            </body>
        </html>
    );
}
