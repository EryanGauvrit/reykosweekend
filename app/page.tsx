import DialogForm from '@/components/basics/DialogForm';
import DisplayImage from '@/components/basics/DisplayImage';
import DisplayValueUpdateTrigger from '@/components/basics/DisplayValueUpdateTrigger';
import GeneralRanking from '@/components/context/GeneralRanking';
import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import NoWebSiteSettings from '@/components/context/NoWebSiteSettings';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import prisma from '@/lib/prisma';
import { IMAGE_SIZE } from '@/lib/utils';
import { getNextEvent } from '@/services/eventService';
import { updateWebSiteSettings } from '@/services/webSiteSettingsService';
import { Event } from '@prisma/client';
import clsx from 'clsx';
import { add, isFuture, isPast } from 'date-fns';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
    const homeSettings = await prisma.webSiteSettings.findFirst();
    const { data: event, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    const pictureSettingsPhone1 = {
        url: homeSettings?.imageMobile?.split('#')[0],
        size: IMAGE_SIZE.homePage.phone,
    };

    const pictureSettingsDesktop1 = {
        url: homeSettings?.imageDesktop?.split('#')[0],
        size: IMAGE_SIZE.homePage.desktop,
    };

    const pictureSettingsPhone2 = {
        url: homeSettings?.imageMobile?.split('#')[1],
        size: IMAGE_SIZE.homePage.phone,
    };

    const pictureSettingsDesktop2 = {
        url: homeSettings?.imageDesktop?.split('#')[1],
        size: IMAGE_SIZE.homePage.desktop,
    };

    if (!homeSettings) {
        return <NoWebSiteSettings />;
    }

    if (!event || isErrored) {
        return <NoEventPlannified />;
    }

    const titleSegment = homeSettings.title.split(': ');
    const titleSecondSegment = titleSegment[1];
    const titleFirstSegment = titleSegment[0] + `${titleSecondSegment ? ':' : ''}`;

    const dateLimitInscription = add(event.startDate, { days: -1 });

    return (
        <main className="flex flex-col gap-40 py-24 flex-1">
            {homeSettings.imageDesktop && homeSettings.imageMobile && (
                <span className="fixed -z-10 top-0 w-full opacity-70">
                    <span className="fixed top-0 w-full h-full from-background via-transparent to-background bg-gradient-to-b" />
                    <DisplayImage
                        phone={pictureSettingsPhone1}
                        desktop={pictureSettingsDesktop1}
                        alt={homeSettings?.title || ''}
                        className={`h-[1080px] w-full object-cover object-center`}
                        priority
                    />
                </span>
            )}
            <section className="container flex gap-16 xl:gap-5 flex-wrap justify-center xl:justify-around">
                <article className="flex flex-col gap-10 max-w-xl">
                    <DisplayValueUpdateTrigger>
                        <h1 className={clsx('text-3xl uppercase font-bold')}>
                            {titleFirstSegment}
                            <br />
                            {titleSecondSegment}
                        </h1>
                        <DialogForm
                            actionFn={updateWebSiteSettings}
                            textOpen={<Pencil size={24} />}
                            size="icon"
                            variant="success"
                            description="Modifier le titre de la page d'accueil"
                            textSubmit="Enregistrer"
                            title="Modification"
                            opacityTrigger={50}
                        >
                            <Input name="title" placeholder="Title" defaultValue={homeSettings.title} />
                            <Input name="id" type="hidden" value={homeSettings.id} />
                        </DialogForm>
                    </DisplayValueUpdateTrigger>
                    <DisplayValueUpdateTrigger>
                        <p className="whitespace-pre-wrap">{homeSettings.description}</p>
                        <DialogForm
                            actionFn={updateWebSiteSettings}
                            textOpen={<Pencil size={24} />}
                            size="icon"
                            variant="success"
                            description="Modifier la description"
                            textSubmit="Enregistrer"
                            title="Modification"
                            opacityTrigger={50}
                        >
                            <Textarea rows={10} name="description" placeholder="Description" defaultValue={homeSettings.description} />
                            <Input name="id" type="hidden" value={homeSettings.id} />
                        </DialogForm>
                    </DisplayValueUpdateTrigger>
                    <div className="flex flex-col mt-14 md:flex-row gap-5 items-center">
                        {isFuture(dateLimitInscription) && (
                            <Link href="/registration" className={clsx(buttonVariants({ variant: 'default', size: 'lg' }))}>
                                Faire une demande d'inscription
                            </Link>
                        )}
                        {isPast(event.startDate) && (
                            <Link href="/quests" className={clsx(buttonVariants({ variant: 'default', size: 'lg' }))}>
                                Liste des quêtes
                            </Link>
                        )}
                        <Link href="/rules" className={clsx(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                            Règles de base
                        </Link>
                    </div>
                </article>
                {isFuture(event.startDate) && <NextEventCountDown startDate={event.startDate} />}
                {isPast(event.startDate) && <GeneralRanking eventId={event.id} />}
            </section>
        </main>
    );
}
