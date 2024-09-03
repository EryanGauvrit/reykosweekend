import DeleteAction from '@/components/basics/DeleteAction';
import { categoryList, deleteCategory } from '@/services/eventService';
import { Category } from '@prisma/client';
import { ChevronRight } from 'lucide-react';

const CategoryDisplay = async () => {
    const res = await categoryList();

    const categories: Category[] = !res.isErrored && res.data;

    return (
        <div className="mt-5">
            {categories.length > 0 ? (
                <ul className="flex flex-col gap-5">
                    {categories.map((category, index) => (
                        <li key={index} className="flex justify-between gap-2 items-center">
                            <div className="flex items-center gap-2">
                                <ChevronRight size={20} className="inline-block" />
                                {category.name}
                            </div>
                            <DeleteAction
                                id={category.id}
                                title="Supprimer cette catégorie"
                                description="Voulez-vous vraiment supprimer cette catégorie ? Si des événements sont associés à cette catégorie, l'action sera annulée."
                                messageValidation="Catégorie supprimée"
                                fnAction={deleteCategory}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune catégorie enregistrée</p>
            )}
            {res.isErrored && <p className="text-destructive font-bold">Erreur : {res.data}</p>}
        </div>
    );
};

export default CategoryDisplay;
