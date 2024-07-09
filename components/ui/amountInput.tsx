import React, { forwardRef } from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Info, MinusCircle, PlusCircle} from "lucide-react";
import CurrencyInput from "react-currency-input-field";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder: string;
    disabled?: boolean;
}

const AmountInput = forwardRef<HTMLInputElement, Props>(
    ({ value, onChange, placeholder, disabled }, ref) => {
        const parsedValue = parseFloat(value);
        const isIncome = parsedValue > 0;
        const isExpense = parsedValue < 0;

        const onReverseValue = () => {
            if (!value) return;
            onChange((parsedValue * -1).toString());
        }
        return (
            <div className="relative">
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                onClick={onReverseValue}
                                className={cn(
                                    `bg-[#0fa1d2] text-white rounded-lg flex items-center justify-center text-sm font-medium
                                    hover:bg-[#b45309] focus:bg-[#b45309] active:bg-[#b45309] absolute right-1.5 top-1.5
                                  `,
                                    isIncome && "bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-600 text-white",
                                    isExpense && "bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-600 text-white",
                                )}
                            >
                                {!parsedValue && <Info className="w-5 h-5" />}
                                {isIncome && <PlusCircle className="w-5 h-5" />}
                                {isExpense && <MinusCircle className="w-5 h-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            use + to add income and - to add expense
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <CurrencyInput
                    ref={ref}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    onValueChange={onChange}
                    prefix="$"
                    decimalsLimit={2}
                    decimalScale={2}
                    decimalSeparator="."
                    className={cn(
                        "w-full border border-gray-200 rounded-lg p-3 text-lg font-medium",
                        disabled && "bg-gray-100 text-gray-400"
                    )}
                />
                <p className="text-sm text-muted-foreground">
                    {isIncome && "Income"}{isExpense && "Expense"}
                </p>
            </div>
        );
    });

AmountInput.displayName = 'AmountInput';

export default AmountInput;