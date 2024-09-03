import FaceBook from '@/icons/FaceBook';
import Instagram from '@/icons/Instagram';
import Linkedin from '@/icons/Linkedin';
import Youtube from '@/icons/Youtube';
import { getWebSiteSettings } from '@/services/webSiteSettingsService';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '../../../public/logo.png';

export const Footer = async () => {
    const settings = await getWebSiteSettings();
    return (
        <footer className="pb-2 pt-4 flex flex-col items-center justify-between gap-8 bg-secondary w-full m-auto text-foreground">
            <div className="container m-auto flex flex-col md:flex-row md:flex-wrap gap-10 justify-around">
                <div className="flex flex-col gap-2">
                    <h4 className="text-md font-bold uppercase">Cadre légal</h4>
                    <Link href={'/legal'} className="text-sm">
                        Mentions légales
                    </Link>
                    <Link href={'/contact'} className="text-sm">
                        Nous contacter
                    </Link>
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <h4 className="text-md font-bold uppercase">Retrouvez nous sur nos réseaux sociaux</h4>
                    <div className="flex gap-2">
                        {settings?.facebook && (
                            <Link href={settings.facebook}>
                                <FaceBook size={32} />
                            </Link>
                        )}
                        {settings?.instagram && (
                            <Link href={settings.instagram}>
                                <Instagram size={32} />
                            </Link>
                        )}
                        {settings?.youtube && (
                            <Link href={settings.youtube}>
                                <Youtube size={32} />
                            </Link>
                        )}
                        {settings?.linkedin && (
                            <Link href={settings.linkedin}>
                                <Linkedin size={32} />
                            </Link>
                        )}
                    </div>
                    <Image className="hidden md:block" src={logoWhite} alt="logo" width={46} height={46} />
                </div>
                <p className="text-sm md:w-full md:text-center">Tous droits réservés © Les Lunaires - {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};
