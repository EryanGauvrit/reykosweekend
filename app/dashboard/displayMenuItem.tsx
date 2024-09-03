import { isAdmin } from '@/services/authService';
import { CalendarCog, PanelTop, Settings, Shield, TrendingUp, UserCog, Users } from 'lucide-react';

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
            label: 'Général',
            href: dashboardUrl + '/global',
            icon: <Settings size={20} />,
            description: 'Paramétrer les informations générales site internet',
        },
        {
            label: 'Mon compte',
            href: dashboardUrl + '/account',
            icon: <UserCog size={20} />,
            description: 'Gérer mon compte',
        },
        {
            label: "Page d'accueil",
            href: dashboardUrl + '/set-homepage',
            icon: <PanelTop size={20} />,
            description: "Paramétrer la page d'accueil",
        },
        {
            label: 'Évènements',
            href: dashboardUrl + '/events',
            icon: <CalendarCog size={20} />,
            description: 'Gérer les évènements',
        },
    ];

    const itemsMenuSuperAdmin: Item[] = [
        {
            label: 'Équipe',
            href: dashboardUrl + '/team',
            icon: <Users size={20} />,
            description: "Gérer l'équipe",
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
