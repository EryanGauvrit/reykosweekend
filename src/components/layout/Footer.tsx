import { getWebSiteSettings } from '@/services/webSiteSettingsService';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '../../../public/logo.png';

export const Footer = async () => {
    const settings = await getWebSiteSettings();
    return (
        <footer className="pb-2 pt-4 flex flex-col items-center justify-between gap-8 bg-secondary w-full m-auto text-foreground opacity-90">
            <div className="container m-auto flex flex-col md:flex-row md:flex-wrap gap-x-10 gap-y-5 justify-center items-center">
                <Image src={logoWhite} alt="logo" width={70} height={70} className="w-16 h-w-16 object-contain" />
                <div className="flex flex-col gap-2">
                    <h4 className="text-md font-bold uppercase">Infos</h4>
                    <Link href={'/rules'} className="text-sm">
                        Consulter les règles
                    </Link>
                    {/* <Link href={'/legal'} className="text-sm">
                        Mentions légales
                    </Link> */}
                    <Link href={'/contact'} className="text-sm">
                        Nous contacter
                    </Link>
                </div>
                <p className="text-sm md:w-full md:text-center">Tous droits réservés © - {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};
