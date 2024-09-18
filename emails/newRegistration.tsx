import { Button, Tailwind } from '@react-email/components';

const NewRegistration = ({ message, email, url }: { message: string; email: string; url: string }) => {
    return (
        <Tailwind>
            <div className="p-4 h-full text-center">
                <h1 className="text-2xl font-bold uppercase my-4">Nouvelle demande d'inscription</h1>
                <h2 className="text-lg font-bold my-4">Email du chef de groupe : </h2>
                <p className="my-4 font-bold">{email}</p>
                <h2 className="text-lg font-bold my-4">Son message : </h2>
                <p className="my-4 text-left max-w-[600px] m-auto p-3 border border-solid border-black rounded-xl whitespace-pre-wrap">
                    {message}
                </p>
                <Button className="mt-4 rounded-lg py-2 px-4 bg-blue-900 uppercase text-white" href={url}>
                    Tableau de bord
                </Button>
            </div>
        </Tailwind>
    );
};

export default NewRegistration;
