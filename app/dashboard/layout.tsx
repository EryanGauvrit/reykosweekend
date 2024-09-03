import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserByEmail } from '@/services/userService';
import { auth, signIn } from 'auth';
import { notFound } from 'next/navigation';
import React from 'react';
import DashboardMenu from './DashboardMenu';

const dashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth();

    const resendVerification = async (formData: FormData) => {
        'use server';
        const email = formData.get('email') as string;
        await signIn('resend', {
            email: email,
        });
    };

    if (!session || !session.user || !session.user.email) {
        notFound();
    }

    const res = await getUserByEmail(session.user.email);

    if (res.isErrored || !res.data) {
        notFound();
    }
    const userFromDb = res.data;

    return (
        <main className="flex flex-1 overflow-hidden">
            <DashboardMenu />
            <div className="w-full p-10">
                {!userFromDb.emailVerified && (
                    <Card className="bg-warning text-warning-foreground opacity-70 text-center w-full max-w-2xl m-auto mb-10">
                        <CardHeader className="pb-0 pt-1">
                            <CardTitle className="text-lg">N'oublie pas de vérifier ton adresse email</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-1">
                            Nous t'avons envoyé un email de vérification à <span className="font-semibold">{userFromDb.email}</span>.
                            Vérifie ta boîte mail et clique sur le lien pour activer ton compte.
                        </CardContent>
                        <CardFooter className="pt-1">
                            <form action={resendVerification} className="m-auto">
                                <input type="hidden" name="email" value={userFromDb.email} />
                                <Button variant={'outline'} type="submit">
                                    Renvoyer l'email de vérification
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                )}
                {children}
            </div>
        </main>
    );
};

export default dashboardLayout;
