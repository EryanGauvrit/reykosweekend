import Discord from '@/icons/Discord';
import Instagram from '@/icons/Instagram';
import Twitch from '@/icons/Twitch';
import { WebSite } from '@/icons/WebSite';
import Youtube from '@/icons/Youtube';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ContactSection = async () => {
    const settings = await prisma.webSiteSettings.findFirst();
    const streamers = await prisma.streamer.findMany();

    return (
        <section className="flex flex-col gap-10">
            {settings && (
                <Card className="flex flex-col items-center px-10 py-5 max-w-2xl m-auto">
                    <h2 className="text-2xl font-bold text-center uppercase">Nos réseaux</h2>
                    <p className="text-center my-4">Retrouvez-nous sur nos réseaux sociaux pour être informé des prochains événements.</p>
                    <ul className="flex gap-4">
                        {settings.discord && (
                            <li>
                                <Link href={settings.discord} target="_blank">
                                    <Discord size={40} />
                                </Link>
                            </li>
                        )}
                        {settings.instagram && (
                            <li>
                                <Link href={settings.instagram} target="_blank">
                                    <Instagram size={40} />
                                </Link>
                            </li>
                        )}
                        {settings.youtube && (
                            <li>
                                <Link href={settings.youtube} target="_blank">
                                    <Youtube size={40} />
                                </Link>
                            </li>
                        )}
                    </ul>
                </Card>
            )}
            <Card className="flex flex-col items-center px-10 py-5 max-w-5xl w-full m-auto">
                <h2 className="text-2xl font-bold text-center uppercase">Nos streamers</h2>
                <p className="text-center my-4">
                    Retrouvez nos streamers sur Twitch pour des lives de qualité. <br /> Vous pouvez également les suivre sur leurs réseaux
                    sociaux.
                </p>
                {streamers.length === 0 ? (
                    <p>Aucun streamer pour le moment</p>
                ) : (
                    <ul className="flex flex-wrap gap-4 justify-center">
                        {streamers.map((streamer) => (
                            <li key={streamer.id} className="w-full max-w-60">
                                <Card className="px-10 py-5 border-amber-400 h-full max-h-[210px]">
                                    <CardHeader>
                                        <CardTitle className="text-center">{streamer.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center gap-4 p-0">
                                        <Button asChild variant={'link'} size={'lg'} className="w-[200px]">
                                            <Link
                                                href={streamer.twitch}
                                                target="_blank"
                                                className="flex items-center gap-2 hover:scale-105 duration-300"
                                            >
                                                <Twitch size={30} /> <span className="text-lg">{streamer.twitch.split('/')[3]}</span>
                                            </Link>
                                        </Button>
                                        <div className="flex items-center gap-2 ">
                                            {streamer.youtube && (
                                                <Link
                                                    href={streamer.youtube}
                                                    target="_blank"
                                                    className="flex flex-col items-center hover:scale-105 duration-300"
                                                >
                                                    <Youtube size={35} />
                                                </Link>
                                            )}
                                            {streamer.instagram && (
                                                <Link
                                                    href={streamer.instagram}
                                                    target="_blank"
                                                    className="flex flex-col items-center hover:scale-105 duration-300"
                                                >
                                                    <Instagram size={35} />
                                                </Link>
                                            )}
                                            {streamer.discord && (
                                                <Link
                                                    href={streamer.discord}
                                                    target="_blank"
                                                    className="flex flex-col items-center hover:scale-105 duration-300"
                                                >
                                                    <Discord size={35} />
                                                </Link>
                                            )}
                                            {streamer.website && (
                                                <Link
                                                    href={streamer.website}
                                                    target="_blank"
                                                    className="flex flex-col items-center hover:scale-105 duration-300"
                                                >
                                                    <WebSite size={35} />
                                                </Link>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </section>
    );
};

export default ContactSection;
