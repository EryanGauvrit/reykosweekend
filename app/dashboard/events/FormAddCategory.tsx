import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory } from '@/services/eventService';
import { SquarePlus } from 'lucide-react';

const FormAddCategory = () => {
    return (
        <DialogForm
            title="Ajouter une catégorie"
            textOpen={<SquarePlus size={26} />}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations de la catégorie à ajouter."
            actionFn={createCategory}
            className="max-w-md"
            size="icon"
            variant="ghost"
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Nom de la catégorie</Label>
                <Input className="placeholder:text-accent" required id="name" type="text" placeholder="Drame" name="name" />
            </div>
        </DialogForm>
    );
};

export default FormAddCategory;
