import { Markdown, Tailwind } from '@react-email/components';

const ParticipantEmail = ({ message }: { message: string }) => {
    return (
        <Tailwind>
            <div className="p-4 h-full border border-solid border-blue-950 rounded-xl max-w-2xl m-auto">
                <Markdown>{message}</Markdown>
                {/* <Markdown>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id reprehenderit, nihil error incidunt soluta totam sit fugit
                    maiores ex similique nobis, excepturi impedit perspiciatis aliquid in eos ratione officiis dolor.
                </Markdown> */}
            </div>
        </Tailwind>
    );
};

export default ParticipantEmail;
