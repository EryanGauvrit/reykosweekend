import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import clsx from 'clsx';
import { Link } from 'lucide-react';
import { buttonVariants } from '../ui/button';

const NoWebSiteSettings = () => {
    return (
        <main className="flex flex-col items-center gap-10 p-24 flex-1">
            <Card>
                <CardHeader>
                    <CardTitle>Page d'accueil</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>La page d'accueil n'est pas encore configurée. Veuillez la configurer.</CardDescription>
                </CardContent>
                <CardFooter>
                    <Link
                        href="/dashboard/set-homepage"
                        className={clsx(
                            buttonVariants({
                                variant: 'success',
                                size: 'default',
                            }),
                        )}
                    >
                        Configurer la page d'accueil
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
};

export default NoWebSiteSettings;
