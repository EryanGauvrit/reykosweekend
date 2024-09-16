'use client';

import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createStreamer, updateStreamer } from '@/services/streamerService';
import { Streamer } from '@prisma/client';
import { Settings } from 'lucide-react';

const FormSetStreamer = ({ streamer }: { streamer?: Streamer }) => {
    if (streamer) {
        return (
            <DialogForm
                title="Modifier un streamer"
                textOpen={<Settings size={20} />}
                textSubmit="Sauvegarder"
                description="Veuillez renseigner les informations du streamer à modifier."
                actionFn={async (formData) => {
                    const streamerToQuery = { ...Object.fromEntries(formData.entries()) };
                    const query = new FormData();
                    query.append('streamer', JSON.stringify(streamerToQuery));
                    query.append('id', streamer.id);
                    return await updateStreamer(query);
                }}
                className="max-w-2xl max-h-[900px] overflow-auto"
                size="icon"
                variant="warning"
            >
                <FormContent streamer={streamer} />
            </DialogForm>
        );
    }

    return (
        <DialogForm
            title="Ajouter un streamer"
            textOpen={'Ajouter un streamer'}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations du streamer à ajouter."
            actionFn={async (formData) => {
                const streamer = { ...Object.fromEntries(formData.entries()) };
                const query = new FormData();
                query.append('streamer', JSON.stringify(streamer));
                return await createStreamer(query);
            }}
            className="max-w-2xl max-h-[900px] overflow-auto"
            size="sm"
            variant="success"
        >
            <FormContent />
        </DialogForm>
    );
};

export default FormSetStreamer;

const FormContent = ({ streamer }: { streamer?: Streamer }) => {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Nom*</Label>
                <Input
                    className="placeholder:text-accent"
                    required
                    id="name"
                    type="text"
                    placeholder="e.g. John Doe"
                    name="name"
                    defaultValue={streamer?.name}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="twitch">Url Twitch*</Label>
                <Input
                    className="placeholder:text-accent"
                    required
                    id="twitch"
                    type="url"
                    placeholder="https://www.twitch.tv/johndoe"
                    name="twitch"
                    defaultValue={streamer?.twitch}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="youtube">Url Youtube</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="youtube"
                        type="url"
                        placeholder="https://www.youtube.com/channel/UCjohndoe"
                        name="youtube"
                        defaultValue={streamer?.youtube || ''}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="instagram">Url Instagram</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="instagram"
                        type="url"
                        placeholder="https://www.instagram.com/johndoe"
                        name="instagram"
                        defaultValue={streamer?.instagram || ''}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="discord">Url Server Discord</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="discord"
                        type="url"
                        placeholder="https://discord.gg/johndoe"
                        name="discord"
                        defaultValue={streamer?.discord || ''}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="website">Url site web</Label>
                    <Input
                        className="placeholder:text-accent"
                        id="website"
                        type="url"
                        placeholder="https://www.johndoe.com"
                        name="website"
                        defaultValue={streamer?.website || ''}
                    />
                </div>
            </div>
        </>
    );
};
