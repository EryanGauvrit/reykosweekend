import FaceBook from '@/icons/FaceBook';
import Instagram from '@/icons/Instagram';
import Linkedin from '@/icons/Linkedin';
import { WebSite } from '@/icons/WebSite';
import Youtube from '@/icons/Youtube';
import { IMAGE_SIZE } from '@/lib/utils';
import { Collaborator } from '@prisma/client';
import clsx from 'clsx';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { montaga } from '../../../style/fonts/font';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const CollaboratorCardDetail = ({ collaborator, direction }: { collaborator: Collaborator; direction: 'left-right' | 'right-left' }) => {
    return (
        <Card
            className={clsx(
                'max-w-[320px] w-full md:flex md:gap-5 md:max-w-4xl md:p-4',
                direction === 'left-right' ? 'md:flex-row' : 'md:flex-row-reverse',
            )}
        >
            {collaborator.image ? (
                <Image
                    className="m-auto md:m-0 rounded-md overflow-hidden w-[220px] md:min-w-[270px] h-[240px] md:h-[295px] object-cover object-center"
                    src={collaborator.image}
                    alt={`${collaborator.firstname} ${collaborator.lastname}`}
                    width={IMAGE_SIZE.collaborator.desktop.width}
                    height={IMAGE_SIZE.collaborator.desktop.height}
                />
            ) : (
                <div className="md:m-0 m-auto w-[220px] md:min-w-[270px] h-[240px] md:h-[295px] bg-muted text-muted-foreground flex justify-center items-center opacity-65 rounded-md overflow-hidden">
                    <ImageOff width="100" height="100" />
                </div>
            )}
            <div className="md:flex md:flex-col md:justify-between">
                <CardHeader className="text-center md:text-start md:pt-0">
                    <CardTitle className={clsx(montaga.className, 'text-muted tracking-wide font-normal text-lg md:text-xl')}>
                        {collaborator.firstname} {collaborator.lastname.toLocaleUpperCase()}
                    </CardTitle>
                    <CardDescription>{collaborator.role}</CardDescription>
                </CardHeader>
                <CardContent>{collaborator.description}</CardContent>
                <CardFooter className="flex justify-center gap-4 text-muted md:pb-0">
                    {collaborator.instagram && (
                        <Link href={collaborator.instagram} className="md:hover:scale-110 duration-300" target="_blank">
                            <Instagram size={32} />
                        </Link>
                    )}
                    {collaborator.facebook && (
                        <Link href={collaborator.facebook} className="md:hover:scale-110 duration-300" target="_blank">
                            <FaceBook size={32} />
                        </Link>
                    )}
                    {collaborator.linkedin && (
                        <Link href={collaborator.linkedin} className="md:hover:scale-110 duration-300" target="_blank">
                            <Linkedin size={32} />
                        </Link>
                    )}
                    {collaborator.youtube && (
                        <Link href={collaborator.youtube} className="md:hover:scale-110 duration-300" target="_blank">
                            <Youtube size={32} />
                        </Link>
                    )}
                    {collaborator.website && (
                        <Link href={collaborator.website} className="md:hover:scale-110 duration-300" target="_blank">
                            <WebSite size={32} />
                        </Link>
                    )}
                </CardFooter>
            </div>
        </Card>
    );
};

export default CollaboratorCardDetail;
