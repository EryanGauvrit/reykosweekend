import Instagram from '@/icons/Instagram';
import { IMAGE_SIZE } from '@/lib/utils';
import { Collaborator } from '@prisma/client';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const CollaboratorCard = ({ collaborator }: { collaborator: Collaborator }) => {
    return (
        <Card className={`w-[220px] md:w-[270px]`}>
            <CardHeader className={`h-[240px] md:h-[295px] p-0 rounded-md overflow-hidden space-y-0 relative`}>
                {collaborator.image ? (
                    <Image
                        className="rounded-md overflow-hidden h-full w-auto object-cover object-center"
                        src={collaborator.image}
                        alt={`${collaborator.firstname} ${collaborator.lastname}`}
                        width={IMAGE_SIZE.collaborator.desktop.width}
                        height={IMAGE_SIZE.collaborator.desktop.height}
                    />
                ) : (
                    <div className="w-full h-full bg-muted text-muted-foreground flex justify-center items-center opacity-65 rounded-md overflow-hidden">
                        <ImageOff width="65" height="65" />
                    </div>
                )}
                {collaborator.instagram && (
                    <div className="opacity-0 md:hover:opacity-100 duration-200 absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                        <p className="text-foreground text-lg font-bold tracking-wider flex flex-col justify-center items-center gap-2">
                            <Instagram size={100} />@{collaborator.instagram?.split('/')[collaborator.instagram?.split('/').length - 2]}
                        </p>
                    </div>
                )}
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pl-0 mt-5">
                <CardTitle className="text-center tracking-wider text-muted text-lg">
                    {collaborator.firstname} {collaborator.lastname.toUpperCase()}
                </CardTitle>
                <CardDescription className="text-center text-base">{collaborator.role}</CardDescription>
            </CardContent>
        </Card>
    );
};

export default CollaboratorCard;
