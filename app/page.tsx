import DisplayImage from '@/components/basics/DisplayImage';
import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { IMAGE_SIZE } from '@/lib/utils';
import { getNextEvent } from '@/services/eventService';
import clsx from 'clsx';
import Link from 'next/link';

export default async function Home() {
    const homeSettings = await prisma.webSiteSettings.findFirst();
    const { data, isErrored } = await getNextEvent();

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
        return (
            <main className="flex flex-col items-center gap-10 p-24 flex-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Page d'accueil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>La page d'accueil n'est pas encore configurée. Veuillez la configurer.</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href="/dashboard/set-homepage"
                            className={clsx(
                                buttonVariants({
                                    variant: 'success',
                                    size: 'default',
                                }),
                            )}
                        >
                            Configurer la page d'accueil
                        </Link>
                    </CardFooter>
                </Card>
            </main>
        );
    }

    if (!data || isErrored) {
        return <NoEventPlannified />;
    }

    const titleSegment = homeSettings.title.split(': ');
    const titleSecondSegment = titleSegment[1];
    const titleFirstSegment = titleSegment[0] + `${titleSecondSegment ? ':' : ''}`;

    return (
        <main className="flex flex-col gap-40 py-24 flex-1">
            {homeSettings.imageDesktop && homeSettings.imageMobile && (
                <span className="absolute -z-10 top-0 w-full opacity-80">
                    <span className="absolute top-0 w-full h-full from-background via-transparent to-background bg-gradient-to-b" />
                    <DisplayImage
                        phone={pictureSettingsPhone1}
                        desktop={pictureSettingsDesktop1}
                        alt={homeSettings?.title || ''}
                        className={`h-[745px] w-full object-cover object-center`}
                        priority
                    />
                </span>
            )}
            <NextEventCountDown startDate={data.startDate} />
            {/* <section className="container flex gap-16 xl:gap-5 flex-wrap justify-center xl:justify-between">
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
                        <Link href="/registration" className={clsx(buttonVariants({ variant: 'default', size: 'default' }))}>
                            Faire une demande d'inscription
                        </Link>
                        <Link href="/rules" className={clsx(buttonVariants({ variant: 'outline', size: 'default' }))}>
                            Règles de base
                        </Link>
                    </div>
                </article>
                {homeSettings.video && (
                    <YoutubeEmbed
                        embedId={getEmbedId(homeSettings.video)}
                        width={560}
                        height={315}
                        title="YouTube video player"
                        // className="hidden md:flex"
                    />
                )}
            </section> */}
        </main>
    );
}
