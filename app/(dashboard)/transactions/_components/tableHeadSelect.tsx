import React from 'react';

import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type Props = {
    columnIndex: number;
    selectedColumn: Record<string, string | null>;
    onChange: (columnIndex: number, value: string | null) => void;
}

const options = [
    "amount",
    "date",
    "payee",
]

const TableHeadSelect = ({ columnIndex, selectedColumn, onChange }: Props) => {
    const currentValue = selectedColumn[`column_${columnIndex}`] || null;
    return (
        <Select
            value={currentValue || ""}
            onValueChange={(value: string) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={
                  cn(`focus:ring focus:ring-transparent outline-none border-none bg-transparent capitalize`,
                      currentValue && "text-primary-600"
                      )
                }
            >
                <SelectValue placeholder="Skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                        value={"sk"}
                >
                    Skip
                </SelectItem>
                {
                    options.map((opt, idx) => {
                        const disabled = Object.values(selectedColumn).includes(opt) && currentValue !== opt;
                        return (
                            <SelectItem
                                key={idx}
                                value={opt}
                                disabled={disabled}
                                className="capitalize"
                            >
                                {opt}
                            </SelectItem>
                        )
                    })
                }
            </SelectContent>

        </Select>
    );
};

export default TableHeadSelect;
