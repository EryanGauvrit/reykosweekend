'use client';

import DialogForm from '@/components/basics/DialogForm';
import { createPlayer, updatePlayer } from '@/services/playerService';
import { Player } from '@prisma/client';
import { Settings, UserPlus } from 'lucide-react';
import { FormPlayer } from '../../registration/RegisterForm';

const FormSetPlayer = ({
    playerProps,
    teamRegisterId,
    teamId,
    eventId,
}: {
    playerProps?: Player;
    teamRegisterId?: string;
    teamId?: string;
    eventId: string;
}) => {
    if (playerProps) {
        return (
            <DialogForm
                title="Modifier un joueur"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations du joueur à modifier."
                className="max-w-2xl"
                actionFn={async (formData) => {
                    const data = Object.fromEntries(formData.entries());
                    const player = {
                        ...data,
                        teamId: teamId || undefined,
                        isOwner: data.isOwner === 'true',
                        nickname: data['nickname0'] as string,
                        minecraftNickname: data['minecraftNickname0'] as string,
                        email: data['email0'] as string,
                    };
                    console.log(player);
                    const formDataQuery = new FormData();
                    formDataQuery.append('player', JSON.stringify(player));
                    formDataQuery.append('id', playerProps.id);
                    return await updatePlayer(formDataQuery);
                }}
                variant="warning"
                size="icon"
            >
                <FormPlayer player={playerProps} isOwner={playerProps.isOwner} />
                <input type="hidden" name="id" value={playerProps.id} />
                {teamId && <input type="hidden" name="teamId" value={teamId} />}
                {teamRegisterId && <input type="hidden" name="teamRegisterId" value={teamRegisterId} />}
                <input type="hidden" name="eventId" value={eventId} />
            </DialogForm>
        );
    }

    return (
        <DialogForm
            title="Ajouter un joueur"
            textOpen={<UserPlus size={20} />}
            size="icon"
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations du joueur à ajouter."
            className="max-w-2xl"
            actionFn={async (formData) => {
                const data = Object.fromEntries(formData.entries());
                const player = {
                    ...data,
                    teamId: teamId || undefined,
                    isOwner: data.isOwner === 'true',
                    nickname: data['nickname0'] as string,
                    minecraftNickname: data['minecraftNickname0'] as string,
                    email: data['email0'] as string,
                };
                const formDataQuery = new FormData();
                formDataQuery.append('player', JSON.stringify(player));
                return await createPlayer(formDataQuery);
            }}
        >
            <FormPlayer />
            {teamId && <input type="hidden" name="teamId" value={teamId} />}
            {teamRegisterId && <input type="hidden" name="teamRegisterId" value={teamRegisterId} />}
            <input type="hidden" name="eventId" value={eventId} />
        </DialogForm>
    );
};

export default FormSetPlayer;
