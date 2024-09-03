'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import Loader from '@/components/basics/Loader';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createUser } from '@/services/userService';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignupForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email');
        const password = Math.random().toString(36).slice(-8);
        formData.append('password', password);
        const response = await createUser(formData);

        if (!response.isErrored) {
            const resSignin = await signIn('resend', {
                email: email,
                passwordTemp: password,
            });
            if (resSignin?.ok) {
                toast({ variant: 'success', title: 'Un mail de confirmation a été envoyé' });
            }
        } else {
            toast({ variant: response.variant, title: response.title, description: response.data });
        }
    };

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router]);

    return (
        <form action={handleSubmit}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center uppercase">Créer un compte</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Prénom</Label>
                        <Input required id="name" type="text" placeholder="Marie" name="name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Nom</Label>
                        <Input required id="username" type="text" placeholder="Dupont" name="username" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input required id="email" type="email" placeholder="marie.dupont@example.com" name="email" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-4">
                <ButtonSubmit className="w-3/4 m-auto" type="submit" variant={'success'}>
                    Créer un compte
                </ButtonSubmit>
            </CardFooter>
            <Loader />
        </form>
    );
};

export default SignupForm;
