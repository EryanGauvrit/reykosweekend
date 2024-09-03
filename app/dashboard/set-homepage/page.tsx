import { getWebSiteSettings } from '@/services/webSiteSettingsService';
import { PanelTop } from 'lucide-react';
import FormSetHomePage from './FormSetHomePage';
import ButtonSeedActivation from '@/components/context/ButtonSeedActivation';

const page = async () => {
    const webSiteSettings = await getWebSiteSettings();
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <PanelTop size={26} />
                Éditer la page d'accueil
            </h1>
            <p>
                Paramétrez ici les informations de la page d'accueil de votre site internet. Vous pouvez ajouter des images, des textes, une
                vidéo trailer
            </p>
            {webSiteSettings ? <FormSetHomePage webSiteSettings={webSiteSettings} /> : <ButtonSeedActivation />}
        </section>
    );
};

export default page;
