'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import Loader from '@/components/basics/Loader';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { signIn, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();
    const [forgotPassword, setForgotPassword] = useState(false);
    const pathname = usePathname();

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email');
        const password = formData.get('password');
        if (forgotPassword) {
            const resSignin = await signIn('resend', {
                email: email,
                callbackUrl: `${pathname}`,
                redirect: false,
            });
            if (resSignin?.ok && !resSignin?.error) {
                toast({ variant: 'success', title: 'Un mail vous a été envoyé' });
            }
            if (resSignin?.error) {
                console.error(resSignin);
                resSignin.status === 401 || resSignin.error === 'Configuration'
                    ? toast({ variant: 'destructive', title: 'Mmmh ...', description: 'Email incorrect' })
                    : toast({ variant: 'destructive', title: 'Erreur', description: 'Une erreur est survenue' });
            }
        } else {
            try {
                const res = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false,
                });
                if (res?.ok && !res?.error) {
                    toast({ variant: 'success', title: 'Connexion réussie' });
                }
                if (res?.error) {
                    console.error(res);
                    res.status === 401 || res.error === 'Configuration'
                        ? toast({ variant: 'destructive', title: 'Mmmh ...', description: 'Email ou mot de passe incorrect' })
                        : toast({ variant: 'destructive', title: 'Erreur', description: 'Une erreur est survenue' });
                }
            } catch (error) {
                toast({ variant: 'destructive', title: 'Mmmh ...', description: 'Une erreur est survenue' });
            }
        }
    };

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
            router.refresh();
        }
    }, [session, router]);

    return (
        <form action={handleSubmit}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center uppercase">{forgotPassword ? 'Mot de passe oublié' : 'Se connecter'}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">{forgotPassword ? 'Email utilisé pour changer le mot de passe' : 'Email'}</Label>
                    <Input required id="email" type="email" placeholder="m@example.com" name="email" />
                </div>
                {!forgotPassword && (
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input required id="password" type="password" name="password" placeholder="********" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-4">
                <Button className="w-3/4 m-auto" type="submit" variant={'success'}>
                    {forgotPassword ? 'Envoyé' : 'Connexion'}
                </Button>
                <ButtonSubmit
                    className="text-sm text-foreground font-normal hover:underline"
                    variant={'link'}
                    onClick={(e) => {
                        e.preventDefault();
                        setForgotPassword(!forgotPassword);
                    }}
                >
                    {forgotPassword ? 'Se connecter' : 'Mot de passe oublié ?'}
                </ButtonSubmit>
            </CardFooter>
            <Loader />
        </form>
    );
};
export default LoginForm;
