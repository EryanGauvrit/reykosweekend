'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { Check, ChevronsUpDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export type ItemSelect = {
    id: string;
    name: string;
    logo?: string;
};

export type AutocompleteProps = {
    data: ItemSelect[];
    placeholder: string;
    name: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    defaultValue?: string;
    isFilter?: boolean;
    isMultiple?: boolean;
};

const Autocomplete = ({
    data,
    placeholder,
    name,
    className,
    disabled,
    required,
    defaultValue,
    isFilter,
    isMultiple,
}: AutocompleteProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue || '');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const handleValueChange = (currentValue: string) => {
        const id = data.find((item) => item.id == currentValue)?.id; // find id from value
        if (isMultiple) {
            const values = value.split('##').map((item) => item);
            if (id && values.includes(id)) {
                // remove value if already selected
                setValue(values.filter((item) => item !== id).join('##'));
            } else {
                // if (values.length === 1 && values[0] === '') {
                //     // remove 0 if no value selected
                //     setValue(JSON.stringify(id) || '');
                // } else {
                setValue([...values, id].join('##')); // add value
                // }
            }
        } else {
            setValue(JSON.stringify(id) || '');
        }
        if (!id || !isFilter) {
            return;
        }
        router.push(`${pathname}?${createQueryString(name, JSON.stringify(id))}`, { scroll: false });
        setOpen(false);
    };

    useEffect(() => {
        if (defaultValue && isMultiple) {
            setValue(defaultValue);
        }
        if (defaultValue && !isMultiple) {
            setValue(JSON.stringify(data.find((item) => item.id == defaultValue)?.id || ''));
        }
    }, [defaultValue, data, isMultiple]);

    return (
        <React.Fragment>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={clsx('w-[200px] justify-between overflow-hidden ', className)}
                        disabled={disabled}
                    >
                        {isMultiple && value.split('##').length > 1
                            ? value
                                  .split('##')
                                  .filter((item) => item !== '')
                                  .map((item) => data.find((data) => data.id === item)?.name)
                                  .join('##')
                            : value
                              ? data.find((item) => item.id === value)?.name || placeholder
                              : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={clsx('w-[200px] p-0 ', className)}>
                    <Command>
                        <CommandInput placeholder={placeholder} />
                        <CommandEmpty>Aucune donnée</CommandEmpty>
                        {data[0] ? (
                            <CommandGroup className="max-h-56 overflow-auto">
                                {data.map((item, index) => (
                                    <CommandItem
                                        key={name + '_' + item.id + index}
                                        value={`${item.id}`}
                                        onSelect={handleValueChange}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                isMultiple
                                                    ? value.split(',').includes(JSON.stringify(item.id))
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                    : value === item.id
                                                      ? 'opacity-100'
                                                      : 'opacity-0',
                                            )}
                                        />
                                        <div className="w-[200px] flex justify-between items-center">
                                            {item.name}
                                            {item.logo && (
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src={item.logo} alt={item.name} className="object-contain object-center" />
                                                </Avatar>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : (
                            <CommandGroup>
                                <CommandItem disabled>Aucune donnée</CommandItem>
                            </CommandGroup>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
            {!isFilter && ( // if isFilter is true, the value is set in url
                <Input type="hidden" name={name} value={value} />
            )}
        </React.Fragment>
    );
};

export default Autocomplete;
