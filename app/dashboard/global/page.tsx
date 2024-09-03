import { getWebSiteSettings } from '@/services/webSiteSettingsService';
import { Settings } from 'lucide-react';
import FormWebSite from './FormWebSite';
import { Button } from '@/components/ui/button';
import ButtonSeedActivation from '@/components/context/ButtonSeedActivation';

const page = async () => {
    const webSiteSettings = await getWebSiteSettings();
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Settings size={26} />
                Paramètres généraux du site
            </h1>
            <p>Paramétrez ici les informations générales de votre site internet.</p>
            {webSiteSettings ? <FormWebSite webSiteSettings={webSiteSettings} /> : <ButtonSeedActivation />}
        </section>
    );
};

export default page;
