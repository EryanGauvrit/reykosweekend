import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUserAndSendMail } from '@/services/userService';

const FormAddUser = () => {
    // const handleSubmit = wrapResponse(async (formData: FormData) => {
    //     'use server';
    // });
    return (
        <DialogForm
            title="Ajouter un administrateur"
            textOpen="Ajouter"
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations de l'administrateur à ajouter."
            actionFn={createUserAndSendMail}
            className="max-w-md"
        >
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="name">Prénom</Label>
                    <Input className="placeholder:text-accent" required id="name" type="text" placeholder="Marie" name="name" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Nom</Label>
                    <Input className="placeholder:text-accent" required id="username" type="text" placeholder="Dupont" name="username" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    className="placeholder:text-accent"
                    required
                    id="email"
                    type="email"
                    placeholder="marie.dupont@example.com"
                    name="email"
                />
            </div>
        </DialogForm>
    );
};

export default FormAddUser;
