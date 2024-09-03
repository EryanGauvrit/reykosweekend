import DialogForm from '@/components/basics/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLocation } from '@/services/eventService';
import { SquarePlus } from 'lucide-react';

const FormAddLocation = () => {
    return (
        <DialogForm
            title="Ajouter un lieu"
            textOpen={<SquarePlus size={26} />}
            textSubmit="Ajouter"
            description="Veuillez renseigner les informations du lieu à ajouter."
            actionFn={createLocation}
            className="max-w-md"
            size="icon"
            variant="ghost"
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Nom du lieu</Label>
                <Input className="placeholder:text-accent" required id="name" type="text" placeholder="Place du village" name="name" />
            </div>
        </DialogForm>
    );
};

export default FormAddLocation;
