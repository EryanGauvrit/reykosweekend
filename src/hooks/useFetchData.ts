// useFetchData.ts
import { useEffect, useState } from 'react';
import prisma from '@/lib/prisma';
import { categoryList, eventList, locationList } from '@/services/eventService';
import { useToast } from '@/components/ui/use-toast';
import { QueryResponse } from '@/services/queryService';

const useFetchData = (model: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            let result: QueryResponse;
            switch (model) {
                case 'category':
                    result = await categoryList();
                    break;
                case 'location':
                    result = await locationList();
                    break;
                case 'event':
                    result = await eventList();
                    break;
                default:
                    result = { isErrored: true, variant: 'destructive', title: 'Erreur', data: 'Modèle non reconnu' };
                    break;
            }

            if (result.isErrored) {
                toast({ variant: result.variant, title: result.title, description: result.data });
                setData([]);
                return;
            }
            setData(result.data);
            setLoading(false);
        };

        fetchData();
    }, [model, toast]);

    return { data, loading };
};

export default useFetchData;
