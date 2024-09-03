import { formatStartEndDate, IMAGE_SIZE } from '@/lib/utils';
import { PlannifiedEventWithInclude } from '@/services/eventService';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const EventCard = ({ event }: { event: PlannifiedEventWithInclude }) => {
    return (
        <Card className={`md:hover:scale-105 duration-200 w-[290px] md:w-[480px]`}>
            <CardHeader className={`h-[190px] md:h-[320px] p-0 pb-6 m-auto`}>
                {event.event.image ? (
                    <Image
                        className="rounded-md overflow-hidden h-full w-auto object-cover object-center"
                        src={event.event.image}
                        alt={event.event.title}
                        width={IMAGE_SIZE.event.desktop.width}
                        height={IMAGE_SIZE.event.desktop.height}
                    />
                ) : (
                    <div className="w-full h-full bg-muted text-muted-foreground flex justify-center items-center opacity-65 rounded-md overflow-hidden">
                        <ImageOff width="65" height="65" />
                    </div>
                )}
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pl-0">
                <p className="text-xs uppercase text-muted font-bold tracking-wide">{event.event.category.name}</p>
                <CardTitle className="text-xl tracking-wider">{event.event.title}</CardTitle>
                <CardDescription>{formatStartEndDate(new Date(event.startDate), new Date(event.endDate))}</CardDescription>
            </CardContent>
            <CardFooter className="pl-0">
                <Link
                    href={`/spectacles/${event.eventId}/${event.event.title.trim().toLocaleLowerCase().replace(' ', '-')}`}
                    className={buttonVariants({ variant: 'outline', size: 'default' })}
                >
                    Voir l'événement
                </Link>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
