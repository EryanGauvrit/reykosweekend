import { Markdown, Tailwind } from '@react-email/components';

const ParticipantEmail = ({ message }: { message: string }) => {
    return (
        <Tailwind>
            <div className="w-full min-h-screen bg-[#020817] py-20">
                <div className="p-4 h-auto border border-solid border-[#3b82f6] bg-[#1e293b] text-[#f8fafc] rounded-xl max-w-2xl m-auto">
                    <Markdown>{message}</Markdown>
                    {/* <Markdown>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id reprehenderit, nihil error incidunt soluta totam sit
                        fugit maiores ex similique nobis, excepturi impedit perspiciatis aliquid in eos ratione officiis dolor.
                    </Markdown> */}
                </div>
            </div>
        </Tailwind>
    );
};

export default ParticipantEmail;
