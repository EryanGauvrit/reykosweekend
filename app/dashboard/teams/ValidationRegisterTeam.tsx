'use client';

import AlertDialogComp from '@/components/basics/AlertDialog';
import Loader from '@/components/basics/Loader';
import { useToast } from '@/components/ui/use-toast';
import { createTeam, updateTeamPlayers } from '@/services/playerService';
import { TeamRegister } from '@prisma/client';
import { UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ValidationRegisterTeam = ({ teamProps }: { teamProps: TeamRegister }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreateTeam = async () => {
        setIsLoading(true);
        const queryNewTeam = new FormData();
        queryNewTeam.append('team', JSON.stringify(teamProps));

        const { isErrored, data } = await createTeam(queryNewTeam);

        if (isErrored) {
            toast({ variant: 'destructive', title: "Erreur lors de la création de l'équipe." });
            setIsLoading(false);
            return;
        }
        const queryPlayers = new FormData();
        queryPlayers.append('teamId', data.teamID);
        queryPlayers.append('teamRegisterId', teamProps.id);

        const playersRes = await updateTeamPlayers(queryPlayers);

        if (playersRes.isErrored) {
            toast({ variant: 'destructive', title: "Erreur lors de l'inscription des joueurs." });
            setIsLoading(false);
            return;
        }

        toast({ variant: 'success', title: "L'équipe a bien été inscrite." });
        router.refresh();
        setIsLoading(false);
    };

    return (
        <>
            <AlertDialogComp
                title="Modifier cette équipe"
                openLabel={<UsersRound size={20} />}
                confirmLabel="Inscrire l'équipe"
                description="Voulez-vous vraiment inscrire cette équipe ?"
                className="max-w-2xl"
                closeLabel="Annuler"
                confirmAction={async () => {
                    handleCreateTeam();
                }}
                variant="success"
                size="icon"
            />
            {isLoading && <Loader withoutPending />}
        </>
    );
};
export default ValidationRegisterTeam;
