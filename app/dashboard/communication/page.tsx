import prisma from '@/lib/prisma';
import { Send } from 'lucide-react';
import MarkdownForm from './MarkdownForm';

const page = async () => {
    const emailsList = await prisma.player.findMany({
        where: {
            email: {
                contains: '@',
                not: null,
            },
        },
        distinct: ['email'],
        select: {
            email: true,
        },
    });

    const emails: string[] = emailsList.map((email) => email.email as string);
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <Send size={26} />
                Communication
            </h1>
            <MarkdownForm emails={emails} />
        </section>
    );
};

export default page;
