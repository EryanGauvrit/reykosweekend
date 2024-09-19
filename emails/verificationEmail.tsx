import { Button, Tailwind } from '@react-email/components';

type Props = {
    url: string;
    passwordTemp?: string;
};

const VerificationEmail = ({ url, passwordTemp }: Props) => {
    return (
        <Tailwind>
            <div className="w-full h-screen bg-[#020817] py-20">
                <div className="p-4 h-auto border border-solid border-[#3b82f6] bg-[#1e293b] text-[#f8fafc] rounded-xl max-w-2xl m-auto">
                    {passwordTemp ? (
                        <>
                            <h1 className="text-2xl font-bold uppercase my-4">Ton compte est maintenant créé</h1>
                            <h2 className="text-lg font-bold my-4">Ton mot de passe temporaire est : </h2>
                            <strong className="px-4 py-2 bg-black/90 text-white rounded-xl text-xl">{passwordTemp}</strong>
                            <p className="my-4">Tu peux le changer une fois connecté</p>
                            <h2 className="text-lg font-bold my-4">Vérifie ton adresse email en cliquant sur le bouton</h2>
                            <Button className="mt-4 rounded-lg py-2 px-4 bg-black/90 text-white" href={url}>
                                Vérifier
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold uppercase my-4">Connectez vous en cliquant sur le lien</h1>
                            <h2 className="text-lg font-bold my-4">N'oubliez pas de réinitialiser votre mot de passe dans votre espace</h2>
                            <Button className="mt-4 rounded-lg py-2 px-4 bg-black/90 text-white" href={url}>
                                Vérifier
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Tailwind>
    );
};

export default VerificationEmail;
