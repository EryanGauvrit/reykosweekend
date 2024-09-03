'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

type Item = {
    value: string;
    label: string;
};

type SelectProps = {
    placeholder?: string;
    defaultValue?: string;
    selectLabel?: string;
    required?: boolean;
    name: string;
    data: Item[];
    className?: string;
    id?: string;
};

const SelectForm = ({ placeholder, defaultValue, name, data, selectLabel, required, className, id }: SelectProps) => {
    const [value, setValue] = useState<string | undefined>(defaultValue);

    const handleValueChange = (value: string) => {
        setValue(value);
    };

    return (
        <Select name={name} defaultValue={value} onValueChange={handleValueChange} required={required}>
            <SelectTrigger className={className} id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {data.map((item, index) => (
                        <SelectItem key={index} value={item.value} className="cursor-pointer">
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectForm;
