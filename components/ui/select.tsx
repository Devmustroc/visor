'use client'

import React, {useMemo} from 'react';
import CreatableSelect from "react-select/creatable";
import {SingleValue} from "react-select";
import {cn} from "@/lib/utils";

type Props = {
    onChange: (value?: string ) => void;
    onCreate?: (value: string) => void;
    value?: string | null | undefined;
    options?: {
        label: string;
        value: string;
    }[],
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const Select = ({
                    onChange,
                    onCreate,
                    value,
                    options = [],
                    placeholder,
                    disabled,
                    className,

    }: Props) => {
    const onSelect = (option: SingleValue<{ label: string, value: string }>) => {
        onChange(option?.value)
    }

    const formattedValue = useMemo(() => {
      return options?.find(option => option.value === value);
    }, [options, value]);
    return (
        <CreatableSelect
            placeholder={placeholder}
            className={cn(`
                text-sm h-10
            `, className)}
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#013122",
                    "&:hover": {
                        borderColor: "#27c48e",
                    },
                    "&:focus": {
                        borderColor: "#98e8cd",
                    },
                }),
            }}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        >

        </CreatableSelect>
    );
};

export default Select;