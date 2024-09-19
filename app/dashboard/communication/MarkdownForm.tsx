'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { textareaStyle } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { sendEmail } from '@/services/emailService';
import { ChangeEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

const MarkdownForm = ({ emails }: { emails?: string[] | null }) => {
    const [markdownText, setMarkdownText] = useState<string>('');
    const { toast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setMarkdownText(e.target.value);
    };

    const handleSubmit = async (formData: FormData): Promise<void> => {
        emails && formData.append('emails', emails.join(', '));
        const res = await sendEmail(formData);

        if (res.isErrored) {
            toast({ variant: res.variant, title: res.title, description: res.description });
            return;
        }
        toast({ variant: res.variant, title: 'Votre message a bien été envoyé', description: res.description });
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {!emails ||
                (emails.length === 0 && (
                    <p className="col-span-2 text-warning p-4 border border-destructive">
                        ⚠️ Il n'y pas de liste d'emails, tu peux seulement envoyer un message à une adresse en remplissant le champ email.
                    </p>
                ))}
            <form action={handleSubmit} className="flex flex-col gap-4 max-w-2xl w-full">
                {!emails || (emails.length === 0 && <Input name="emails" type="email" placeholder="Email" required />)}
                <Input name="subject" type="text" placeholder="Sujet" required />
                <TextareaAutosize
                    className={textareaStyle}
                    value={markdownText}
                    onChange={handleChange}
                    placeholder="Écris ici ton Markdown..."
                    name="message"
                    required
                />
                <ButtonSubmit>Envoyer</ButtonSubmit>
            </form>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold ">Prévisualisation</h2>
                <Card className="p-4 h-full">
                    <ReactMarkdown>{markdownText}</ReactMarkdown>
                </Card>
            </div>
        </div>
    );
};

export default MarkdownForm;
