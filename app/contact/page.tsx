import FormContact from './formContact';

const page = () => {
    return (
        <main className="flex flex-col items-center gap-10 p-10 flex-1">
            <h1 className="text-4xl font-bold uppercase">Nous contacter</h1>
            <FormContact />
        </main>
    );
};

export default page;
