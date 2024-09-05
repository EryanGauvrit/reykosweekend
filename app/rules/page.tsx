import { Card, CardContent, CardHeader } from '@/components/ui/card';

const page = () => {
    return (
        <main className="flex-1 container max-w-5xl">
            <Card className="p-6 my-10">
                <CardHeader>
                    <h1 className="text-2xl font-bold">⚠️⚠️ Les 11 commandements du serveur ⚠️⚠️</h1>
                </CardHeader>
                <CardContent className=" flex flex-col gap-6">
                    <p>⚔️ Plongez dans une aventure Hardcore en survie à vivre en équipe durant un week-end intense !</p>
                    <ol className="list-decimal flex flex-col gap-4 max-w-3xl w-full m-auto">
                        <li>Équipes de 3 à 5 joueurs : Formez votre groupe et préparez-vous pour 48 heures de survie acharnée.</li>
                        <li>Horaires : Le serveur s'ouvre vendredi à 20h et se ferme dimanche à 20h. Tenez bon jusqu'à la fin !</li>
                        <li>
                            Objectifs variés : Gagnez des points en accomplissant des objectifs tout au long du week-end. Certains seront
                            essentiels, comme tuer l'Enderdragon, d'autres complètement farfelus, comme collectionner toutes les laines du
                            jeu.
                        </li>
                        <li>
                            Événements en équipe ou en solo : Participez à des défis collectifs ou désignez un champion pour représenter
                            votre équipe dans des épreuves comme des combats PvP ou des concours de pêche.
                        </li>
                        <li>
                            PvP activé partout : À l'exception du spawn, le PvP est omniprésent. Gagnez des points en éliminant d'autres
                            joueurs, mais attention, la mort vous fera perdre des points.
                        </li>
                        <li>Commerce au spawn : Échangez des équipements et des ressources avec les autres équipes au spawn.</li>
                        <li>
                            Pactes et vols : Les alliances entre équipes sont interdites, mais les pactes de non-agression sont autorisés.
                            Soyez vigilant, car vos camps peuvent être pillés par les autres équipes.
                        </li>
                        <li>
                            Chat de proximité obligatoire : La communication est clé. Le chat vocal de proximité est obligatoire pour
                            renforcer le côté social du jeu.
                        </li>
                        <li>Interdiction des triches : L'utilisation de glitchs ou de logiciels de triche est strictement interdite.</li>
                        <li>Commandes restreintes : Seules les commandes liées à l’équipe et le /spawn sont autorisés.</li>
                        <li>
                            Respect obligatoire : Les insultes, les propos discriminatoires, les blagues à caractère sexiste, raciste,
                            homophobe, ou tout autre type de discours haineux sont strictement interdits. Toute forme de harcèlement, y
                            compris les commentaires ou blagues qui peuvent être perçus comme offensants ou inappropriés, est également
                            prohibée. Si une règle est enfreinte, l'ensemble de l'équipe sera sanctionné, pouvant aller jusqu'à l'exclusion
                            du serveur.
                        </li>
                    </ol>
                    <p>Préparez vous pour un week-end où stratégie, survie, et compétition seront vos meilleures alliées ! 🗡️🛡️</p>
                </CardContent>
            </Card>
        </main>
    );
};

export default page;
