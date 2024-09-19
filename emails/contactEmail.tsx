import { Tailwind } from '@react-email/components';

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
};

const ContactEmail = ({ email, firstName, lastName, message, subject }: Props) => {
    return (
        <Tailwind>
            <div className="w-full min-h-screen bg-[#020817] py-20">
                <div className="p-4 h-auto border border-solid border-[#3b82f6] bg-[#1e293b] text-[#f8fafc] rounded-xl max-w-2xl m-auto">
                    <h1 className="text-2xl font-bold uppercase my-4">
                        {lastName} {firstName} - {subject}
                    </h1>
                    <h2 className="text-lg font-bold my-4">Son email : </h2>
                    <p className="my-4 font-bold">{email}</p>
                    <h2 className="text-lg font-bold my-4">Son message : </h2>
                    <p className="my-4 text-left max-w-[600px] m-auto p-3 border border-solid border-black rounded-xl whitespace-pre-wrap">
                        {message}
                    </p>
                </div>
            </div>
        </Tailwind>
    );
};

export default ContactEmail;
