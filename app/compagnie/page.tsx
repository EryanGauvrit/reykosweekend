import DisplayImage from '@/components/basics/DisplayImage';
import CollaboratorCardDetail from '@/components/context/CollaboratorCardDetail';
import { buttonVariants } from '@/components/ui/button';
import Quote from '@/icons/Quote';
import prisma from '@/lib/prisma';
import { IMAGE_SIZE } from '@/lib/utils';
import { Collaborator } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';

const page = async () => {
    const webSiteSettings = await prisma.webSiteSettings.findFirst();
    const team: Collaborator[] = await prisma.collaborator.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });

    const pictureSettingsPhone1 = {
        url: webSiteSettings?.imageMobile?.split('#')[0],
        size: IMAGE_SIZE.homePage.phone,
    };

    const pictureSettingsDesktop1 = {
        url: webSiteSettings?.imageDesktop?.split('#')[0],
        size: IMAGE_SIZE.homePage.desktop,
    };

    return (
        <main>
            {webSiteSettings?.imageDesktop && webSiteSettings?.imageMobile && (
                <span className="fixed -z-10 top-0 w-full opacity-80">
                    <DisplayImage
                        phone={pictureSettingsPhone1}
                        desktop={pictureSettingsDesktop1}
                        alt={webSiteSettings?.title || ''}
                        className={`h-[1080px] w-full object-cover object-center`}
                        priority
                    />
                </span>
            )}
            <section className="relative pt-20 pb-40">
                <span className="absolute top-0 -z-10 w-full h-full from-transparent to-background from-0% bg-gradient-to-b" />
                <div className="flex flex-col justify-center gap-10 container">
                    <h1 className="text-3xl font-bold uppercase">Qui sommes-nous ?</h1>
                    <p className="text-lg">
                        Née de l’envie commune de créer des personnages féminins forts, les lunaires se nourrissent des territoires, du
                        patrimoine et de L’Histoire pour créer des projets qui aspirent autant à susciter l’émotion que la réflexion.
                        <br />
                        <br />
                        Par l’écriture de nouveaux récits, nichés quelque part entre rêve et réalité, les lunaires ont à cœur de lever le
                        voile sur l’effacement des femmes. Guidées par leur sensibilité face à l’injustice sociale, elles portent en elles
                        l’envie d’éveiller les consciences pour suggérer le changement, l’entraide et la sororité. Mélant théâtre, musique,
                        chant, danse, et composition sonore, les lunaires vous feront voyager dans un univers parfois sombre, onirique, et
                        psychologique.
                        <br />
                        <br />
                        Toutes trois ayant suivi la même formation d'acting, elle souhaitent apporter au théâtre l'intimité du jeu cinéma.
                    </p>
                    <Link
                        className={clsx(buttonVariants({ variant: 'default', size: 'default' }), 'w-fit m-auto md:m-0')}
                        href="/spectacles"
                    >
                        Découvrez nos spectacles
                    </Link>
                </div>
            </section>
            <section className="bg-background hidden md:block py-5 relative">
                <div className="flex flex-col gap-10 container">
                    <h2 className="text-3xl font-bold uppercase">Notre équipe </h2>
                    <div className="flex gap-4">
                        <Quote size={60} className="text-muted min-w-[60px]" />

                        <blockquote className="text-lg flex flex-col gap-5 my-4">
                            Il était une fois, une jeune rêveuse qui souhaitait porter ses ambitions jusqu’à la lune. Mais le chemin
                            jusqu’aux étoiles était long et sinueux. Sur la route, après plusieurs années de marche; alors qu’elle était
                            exténuée, à bout de force, elle entendit une voix mélodieuse qui ruisselait au bord de l’eau. Intriguée, elle
                            s’en approcha et découvrit, une amoureuse. La jeune rêveuse lui demanda:
                            <ul>
                                <li>- De qui donc es-tu amoureuse ?</li>
                                <li>- De tout: de la nature, des animaux, et de l’humanité.</li>
                                <li>- Où vas-tu ?</li>
                                <li>- Où le destin me porte. Voudrais-tu que je t’accompagne ?</li>
                            </ul>
                            La jeune rêveuse accepta, car la positivité de l’amoureuse lui redonnait du souffle. Et elles partirent ensemble
                            sur le chemin vers les étoiles. Mais la route était sombre et tortueuse et les jeunes femmes avaient peur de
                            l’obscurité. C’est là qu’elle croisèrent la rebelle dont les reflets de lune rejaillissait de son épée, et la
                            lumière les attira.
                            <ul>
                                <li>- N’as-tu pas peur, seule dans les bois ? demande la jeune rêveuse.</li>
                                <li>- J’ai peur parfois. Mais j’avance quand même.</li>
                                <li>- Et ou vas-tu ?</li>
                                <li>- Où l'on ne m’attend pas. Voulez-vous que je vienne ? répondit la rebelle.</li>
                            </ul>
                            Ainsi, elles se joignit au groupe, apportant l’indocilité, qui leur permire à toutes trois et ce malgré
                            l’adversité de continuer sans vaciller.
                            <br /> Et c’est ainsi qu’à force de rêver, d’y croire et de se battre, elles atteignir la lune.
                        </blockquote>
                        <Quote size={60} className="self-end text-muted rotate-180 min-w-[60px]" />
                    </div>
                </div>
                <span className="absolute -bottom-[500px] -z-10 w-full h-[500px] to-transparent from-background from-0% bg-gradient-to-b" />
            </section>
            <section className="py-10 flex flex-col items-center gap-10 to-background via-background/40 from-background from-15% bg-gradient-to-b">
                {team &&
                    team[0] &&
                    team.map((collaborator, index) => {
                        return (
                            <CollaboratorCardDetail
                                key={index}
                                collaborator={collaborator}
                                direction={index % 2 === 0 ? 'left-right' : 'right-left'}
                            />
                        );
                    })}
            </section>
        </main>
    );
};

export default page;
