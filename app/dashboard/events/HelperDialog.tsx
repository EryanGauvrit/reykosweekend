import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ChevronRight, CircleHelp, Settings, SquarePlus, Trash } from 'lucide-react';

const HelperDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit flex gap-2 items-center" size={'sm'}>
                    <CircleHelp size={20} />
                    Notice
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[900px] p-10 overflow-auto">
                <DialogHeader>
                    <DialogTitle>Comment fonctionne cet interface ?</DialogTitle>
                </DialogHeader>
                <ul className="flex flex-col gap-4 py-5">
                    <li className="flex flex-col gap-2">
                        <h3 className="font-bold mb-2">Lieux</h3>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez ajouter des lieux
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'ghost'}>
                                <SquarePlus size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez voir afficher la liste des lieux ajoutés
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez supprimer des lieux
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'destructive'}>
                                <Trash size={16} />
                            </Button>
                        </p>
                    </li>
                    <li className="flex flex-col gap-2">
                        <h3 className="font-bold mb-2">Catégorie</h3>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez ajouter des catégories comme pour les évènements de type Spectacle ou les autres comme "Atelier",
                            "Rencontre", etc.
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'ghost'}>
                                <SquarePlus size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez voir afficher la liste des catégories ajoutées
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez supprimer des catégories
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'destructive'}>
                                <Trash size={16} />
                            </Button>
                        </p>
                    </li>
                    <li className="flex flex-col gap-2">
                        <h3 className="font-bold mb-2">Évènements</h3>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            ATTENTION: Pour ajouter des évènements, vous devez d'abord ajouter des catégories, il faut obligatoirement lié
                            un évènement à une catégorie
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'ghost'}>
                                <SquarePlus size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez voir afficher la liste des évènements ajoutés, avec un prévisualisation de l'affiche, son titre, son
                            auteur et l'âge minimum
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez voir plus de détails et modifier un évènement
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'warning'}>
                                <Settings size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez supprimer des évènements
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'destructive'}>
                                <Trash size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Les évènements peuvent être des spectacles ou autres évènements, à vous de les organiser comme vous le souhaitez
                        </p>
                    </li>

                    <li className="flex flex-col gap-2">
                        <h3 className="font-bold mb-2">Dates</h3>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            ATTENTION : Pour ajouter des dates, vous devez d'abord ajouter des évènements et des lieux
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'ghost'}>
                                <SquarePlus size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez voir afficher la liste des dates ajoutées, triées par dates passées et dates à venir
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez voir plus de détails et modifier une date, en modifiant l'évènement, le lieu et la date
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'warning'}>
                                <Settings size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Vous pouvez supprimer des dates
                            <Button size={'icon'} className="min-w-7 w-7 h-6" variant={'destructive'}>
                                <Trash size={16} />
                            </Button>
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Les évènements et les lieux sont liés aux dates, si vous supprimez un évènement ou un lieu, les dates liées
                            seront aussi supprimées.
                        </p>
                        <p className="flex items-center gap-2">
                            <ChevronRight size={20} className="min-w-[20px] mr-2" />
                            Les évènements et les lieux peuvent être assignés à plusieurs dates, à vous d'organiser votre calendrier
                        </p>
                    </li>
                </ul>
                <DialogFooter>
                    <DialogClose
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                size: 'default',
                            }),
                        )}
                    >
                        OK
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default HelperDialog;
