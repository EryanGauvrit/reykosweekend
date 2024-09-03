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
import HeaderAuth from '@/components/auth/HeaderAuth';
import BgDesign from '@/components/layout/BgDesign';

const TITLE = 'Les Lunaires: Théâtre Féministe et Engagé';
const DESCRIPTION = 'Les Lunaires: Théâtre Féministe et Engagé';

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
