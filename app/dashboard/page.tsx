import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { displayMenuItem } from './displayMenuItem';

const page = async () => {
    const allItemsMenu = await displayMenuItem();
    const itemsMenu = allItemsMenu.filter((item) => item.label !== 'Tableau de bord');

    return (
        <>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <TrendingUp size={26} />
                Tableau de bord
            </h1>
            <section className="flex flex-wrap gap-4 mt-10">
                {itemsMenu.map((item, index) => (
                    <Link key={index} href={item.href} passHref className="hover:scale-105 duration-200 w-72 h-52">
                        <Card className="p-5 h-full w-full">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center justify-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </section>
        </>
    );
};

export default page;
