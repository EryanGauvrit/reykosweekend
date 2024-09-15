import React from 'react';
import { Card } from '../ui/card';
import Link from 'next/link';
import Discord from '@/icons/Discord';
import Instagram from '@/icons/Instagram';
import Twitch from '@/icons/Twitch';

const ContactSection = () => {
    return (
        <section className="flex flex-col gap-10">
            <Card className="flex flex-col items-center px-10 py-5 max-w-2xl m-auto">
                <h2 className="text-2xl font-bold text-center uppercase">Nos réseaux</h2>
                <p className="text-center my-4">Retrouvez-nous sur nos réseaux sociaux pour être informé des prochains événements.</p>
                <ul className="flex gap-4">
                    <li>
                        <Link href="https://discord.gg/" target="_blank">
                            <Discord size={40} />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://instagram.com/" target="_blank">
                            <Instagram size={40} />
                        </Link>
                    </li>
                </ul>
            </Card>
            <Card className="flex flex-col items-center px-10 py-5 max-w-2xl m-auto">
                <h2 className="text-2xl font-bold text-center uppercase">Nos streamers</h2>
                <p className="text-center my-4">
                    Retrouvez nos streamers sur Twitch pour des lives de qualité. <br /> Vous pouvez également les suivre sur leurs réseaux
                    sociaux.
                </p>
                <ul className="flex flex-wrap gap-4 justify-center">
                    <li>
                        <Link
                            href="https://www.twitch.tv/roxen_tv"
                            target="_blank"
                            className="flex flex-col items-center hover:scale-105 duration-300"
                        >
                            <Card className="flex gap-2 items-center px-10 py-5">
                                <Twitch size={20} /> <span>RoXeN_TV</span>
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.twitch.tv/drayji"
                            target="_blank"
                            className="flex flex-col items-center hover:scale-105 duration-300"
                        >
                            <Card className="flex gap-2 items-center px-10 py-5">
                                <Twitch size={20} /> <span>Drayji</span>
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.twitch.tv/titoum__"
                            target="_blank"
                            className="flex flex-col items-center hover:scale-105 duration-300"
                        >
                            <Card className="flex gap-2 items-center px-10 py-5">
                                <Twitch size={20} /> <span>Titoum__</span>
                            </Card>
                        </Link>
                    </li>
                </ul>
            </Card>
        </section>
    );
};

export default ContactSection;