import { cn } from '@/lib/utils';

type YoutubeEmbedProps = {
    title: string;
    embedId: string;
    width: number;
    height: number;
    className?: string;
};

const YoutubeEmbed = ({ embedId, width, height, className, title }: YoutubeEmbedProps) => {
    return (
        <div className={cn('overflow-hidden rounded-xl flex items-center', className)}>
            <iframe
                width={width}
                height={height}
                src={`https://www.youtube.com/embed/${embedId}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default YoutubeEmbed;
