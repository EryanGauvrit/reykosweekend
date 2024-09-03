/* eslint-disable react/no-unescaped-entities */

import { Card, CardHeader } from '@/components/ui/card';

const page = async () => {
    return (
        <main className="container max-w-2xl w-full my-10 flex-1">
            <Card className="flex justify-center my-20">
                <CardHeader className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-center">
                        Un email de confirmation avec un mot de passe provisoir vous a été envoyé
                    </h1>
                    <h2 className="text-xl font-bold text-center">
                        Consulter vos mails et n'oubliez pas de changer rapidement de mot de passe !
                    </h2>
                </CardHeader>
            </Card>
        </main>
    );
};

export default page;
