import { isAdmin } from '@/services/authService';
import { CalendarCog, PanelTop, Settings, Shield, Swords, TrendingUp, UserCog, Users } from 'lucide-react';

export interface Item {
    label: string;
    href: string;
    icon?: JSX.Element;
    description?: string;
}

export const displayMenuItem = async () => {
    const dashboardUrl = '/dashboard';

    const itemsMenu: Item[] = [
        {
            label: 'Tableau de bord',
            href: dashboardUrl,
            icon: <TrendingUp size={20} />,
            description: '',
        },
        {
            label: 'Équipes',
            href: dashboardUrl + '/teams',
            icon: <Users size={20} />,
            description: 'Gérer les équipes',
        },
        {
            label: 'Quêtes',
            href: dashboardUrl + '/quests',
            icon: <Shield size={20} />,
            description: 'Gérer les quêtes',
        },
        {
            label: 'Challenges',
            href: dashboardUrl + '/challenges',
            icon: <Swords size={20} />,
            description: 'Gérer les challenges',
        },
        {
            label: 'Général',
            href: dashboardUrl + '/global',
            icon: <Settings size={20} />,
            description: 'Paramétrer les informations générales site internet',
        },
        {
            label: "Page d'accueil",
            href: dashboardUrl + '/set-homepage',
            icon: <PanelTop size={20} />,
            description: "Paramétrer la page d'accueil",
        },
        {
            label: 'Mon compte',
            href: dashboardUrl + '/account',
            icon: <UserCog size={20} />,
            description: 'Gérer mon compte',
        },
    ];

    const itemsMenuSuperAdmin: Item[] = [
        {
            label: 'Évènements',
            href: dashboardUrl + '/events',
            icon: <CalendarCog size={20} />,
            description: 'Gérer les évènements',
        },
        {
            label: 'Administrateurs',
            href: dashboardUrl + '/users',
            icon: <Shield size={20} />,
            description: 'Gérer les administrateurs',
        },
    ];

    if (await isAdmin()) {
        // Super Admin
        itemsMenu.push(...itemsMenuSuperAdmin);
    }
    return itemsMenu;
};
