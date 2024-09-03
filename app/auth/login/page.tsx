import { Card } from '@/components/ui/card';
import LoginForm from './form';

const Login = () => {
    return (
        <main className="h-full flex flex-col items-center justify-center flex-1">
            <Card className="max-w-md py-10 flex flex-col gap-4 my-10 w-full">
                <LoginForm />
            </Card>
        </main>
    );
};
export default Login;
