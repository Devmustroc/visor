import React from 'react';

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder: string;
    disabled?: boolean;
}

const AmountInput = ({
        value,
        onChange,
        placeholder, disabled
    }: Props) => {
    return (
        <div>
            Hello
        </div>
    );
};

export default AmountInput;