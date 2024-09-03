import { Card } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import SignupForm from './form';

const Signup = async () => {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
        redirect('/');
    }
    return (
        <main className="h-full flex flex-col items-center justify-center flex-1">
            <Card className="max-w-md py-8 flex flex-col gap-4 my-10 w-full">
                <SignupForm />
            </Card>
        </main>
    );
};

export default Signup;
