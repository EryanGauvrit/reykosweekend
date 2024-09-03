'use client';

import clsx from 'clsx';
import CollaboratorCard from '../context/CollaboratorCard';
import EventCard from '../context/EventCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const CarouselClient = ({ data, dataType, className }: { data: any[]; dataType: 'event' | 'collaborator'; className?: string }) => {
    return (
        <Carousel
            opts={{
                align: 'center',
                loop: true,
            }}
            className={clsx('sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl 2xl:max-w-7xl mx-auto w-full overflow-visible', className)}
        >
            <CarouselContent className="m-5 -ml-1 overflow-visible">
                {data.map((element) => {
                    return (
                        <CarouselItem
                            className="md:hover:z-10 p-0 pl-3 basis-11/12 xs:basis-2/3 sm:basis-7/12 md:basis-9/12 lg:basis-8/12 xl:basis-6/12 2xl:basis-5/12 overflow-visible"
                            key={element.id}
                        >
                            {dataType === 'event' && <EventCard event={element} />}
                            {dataType === 'collaborator' && <CollaboratorCard collaborator={element} />}
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
    );
};

export default CarouselClient;
