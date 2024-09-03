'use client';

import ButtonSubmit from '@/components/basics/ButtonSubmit';
import Loader from '@/components/basics/Loader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { sendContactEmail } from '@/services/emailService';

const FormContact = () => {
    const { toast } = useToast();

    return (
        <form
            className="flex flex-col gap-4 max-w-2xl w-full"
            action={(formData) =>
                sendContactEmail(formData)
                    .then((res) => {
                        if (res.isErrored) {
                            toast({ variant: res.variant, title: res.title, description: res.description });
                        } else {
                            toast({ variant: res.variant, title: 'Votre message a bien été envoyé', description: res.description });
                        }
                    })
                    .catch((err) => {
                        toast({ variant: 'destructive', title: 'Erreur', description: err });
                    })
            }
        >
            <div className="grid gap-2 grid-cols-2">
                <Input name="lastname" type="text" placeholder="Nom" />
                <Input name="firstname" type="text" placeholder="Prénom" />
            </div>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="subject" type="text" placeholder="Sujet" />
            <Textarea name="message" id="message" cols={30} rows={10} placeholder="Votre message ..."></Textarea>
            <ButtonSubmit type="submit">Envoyé</ButtonSubmit>
            <Loader />
        </form>
    );
};

export default FormContact;
