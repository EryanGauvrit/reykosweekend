import NextEventCountDown from '@/components/context/NextEventCountDown';
import NoEventPlannified from '@/components/context/NoEventPlannified';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { formatStartEndDate } from '@/lib/utils';
import { getNextEvent } from '@/services/eventService';
import { Event } from '@prisma/client';
import { add, isFuture } from 'date-fns';
import Link from 'next/link';
import RegisterForm from './RegisterForm';

const page = async () => {
    const { data, isErrored }: { data: Event; isErrored: boolean } = await getNextEvent();

    if (!data || isErrored) {
        return <NoEventPlannified />;
    }

    const dateLimitInscription = add(data.startDate, { days: -1 });

    return (
        <main className="flex-1 flex flex-col items-center my-5">
            {isFuture(dateLimitInscription) ? (
                <>
                    <NextEventCountDown startDate={dateLimitInscription} title="Fin des inscriptions dans" className="mb-5" />
                    <Card className="px-10 py-5">
                        <CardHeader className="flex flex-col items-center gap-2">
                            <h1 className="text-3xl uppercase font-bold">Inscription: {data?.title}</h1>
                            <h2 className="text-lg font-semibold">
                                {formatStartEndDate(new Date(data.startDate), new Date(data.dueDate))}
                            </h2>
                            <CardDescription>
                                Discutes avec tes potes pour savoir qui veut participer à cet événement. <br />
                                Ensuite inscrit ton équipe directement ici 👇. <br />
                                ⚠️ Attention, en cas de désistement, merci de{' '}
                                <Link href="/contact" className="underline">
                                    nous prévenir au plus vite.
                                </Link>
                            </CardDescription>
                        </CardHeader>
                        <RegisterForm eventId={data.id} />
                    </Card>
                </>
            ) : (
                <Card className="px-10 py-5">
                    <CardHeader className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl uppercase font-bold">Inscription: {data?.title}</h1>
                        <h2 className="text-lg font-semibold">{formatStartEndDate(new Date(data.startDate), new Date(data.dueDate))}</h2>
                        <CardDescription>Les inscriptions pour cet événement sont terminées.</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </main>
    );
};

export default page;
