import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const dbInitializer = async () => {
    await prisma.webSiteSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            emailContact: 'A renseigner',
            title: 'A renseigner',
            subtitle: 'A renseigner',
            description: 'A renseigner',
            imageDesktop: '',
            imageMobile: '',
            favicon: 'A renseigner',
            logo: 'A renseigner',
            logoWhite: 'A renseigner',
        },
    });
};

dbInitializer()
    .then(() => {
        console.log('Database initialized');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
