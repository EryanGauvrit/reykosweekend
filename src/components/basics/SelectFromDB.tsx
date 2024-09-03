import prisma from '@/lib/prisma';
import SelectForm from './SelectForm';
import useFetchData from '@/hooks/useFetchData';
import Loader from './Loader';

type SelectFromDBProps = {
    placeholder?: string;
    defaultValue?: string;
    selectLabel?: string;
    name: string;
    model: string;
    required?: boolean;
    className?: string;
    id?: string;
};

const SelectFromDB = ({ placeholder, defaultValue, name, model, selectLabel, required, className, id }: SelectFromDBProps) => {
    const { data, loading } = useFetchData(model);

    if (loading) {
        return <Loader />;
    }

    if (!data[0] && !loading) {
        return <div>Erreur lors de la récupération des données</div>;
    }

    if (data[0] && !loading) {
        return (
            <>
                {!data[0] && !loading ? (
                    <div>Erreur lors de la récupération des données</div>
                ) : (
                    <SelectForm
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        name={name}
                        data={data.map((item) => ({
                            value: item.id.toString(),
                            label: item.name || item.title,
                        }))}
                        selectLabel={selectLabel}
                        required={required}
                        className={className}
                        id={id}
                    />
                )}
            </>
        );
    }
};

export default SelectFromDB;
