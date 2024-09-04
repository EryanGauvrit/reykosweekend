import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-2/3 gap-5 flex-1">
            <h2 className="text-4xl font-bold text-destructive">404</h2>
            <h3 className="text-2xl font-bold">Erreur 404</h3>
            <p className="text-lg font-semibold text-primary mt-4">La page que vous recherchez n'existe pas.</p>
            <Link href="/" className="text-lg font-semibold text-primary mt-4 underline">
                Retour à l'accueil
            </Link>
        </div>
    );
}
