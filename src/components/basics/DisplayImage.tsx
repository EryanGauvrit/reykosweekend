'use client';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import { cn, getPicture, PictureToDisplay } from '@/lib/utils';
import Image from 'next/image';

type Props = {
    phone: PictureToDisplay;
    desktop: PictureToDisplay;
    className?: string;
    alt: string;
    priority?: boolean;
};
const DisplayImage = (props: Props) => {
    const windowDimensions = useWindowDimensions();
    if (windowDimensions.width) {
        const picture = getPicture(props.phone, props.desktop);
        if (!picture.url) {
            return null;
        }
        return (
            <Image
                className={cn('m-auto w-[1920px] h-auto object-cover object-center', props.className)}
                src={picture.url}
                alt={props.alt}
                width={picture.size.width}
                height={picture.size.height}
                priority={props.priority}
            />
        );
    }
};

export default DisplayImage;
