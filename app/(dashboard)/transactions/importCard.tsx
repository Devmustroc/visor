import React, {useState} from 'react';
import {Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import ImportTable from "@/app/(dashboard)/transactions/_dataTable/importTable";
import {cn, convertToMillUnit} from "@/lib/utils";
import {format, parse} from "date-fns";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputDateFormat = "yyyy-MM-dd";

const requiredOptions =  [
    "amount",
    "date",
    "payee"
];

interface SelectedColumnsState {
    [key: string]: string | null;
}

type Props = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
    const [selected, setSelected] = useState<SelectedColumnsState>({})
    const header = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelected((prev) => {
            const newSelected = {...prev};
            for (const key in newSelected) {
                if (newSelected[key] === value) {
                    newSelected[key] = null;
                }
            }

            if (value === "skip") {
                value = null;
            }

            newSelected[`column_${columnIndex}`] = value;

            return newSelected;
        })
    }

    const progress = Object.values(selected).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split('_')[1]
        }
        const mappedData = {
            headers: header.map((_headers, index) => {
                const columnIndex = getColumnIndex(`column_${index}`)
                return selected[`column_${columnIndex}`] || null
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell , index) => {
                    const columnIndex = getColumnIndex(`column_${index}`)
                    return selected[`column_${columnIndex}`] ? cell : null
                })

                return transformedRow.every((item) => item === null) ? [] : transformedRow;
            }).filter((row) => row.length > 0 )
        }

        const arrData = mappedData.body.map((row) => {
            return row.reduce((acc:any , cell, index) => {
                const header = mappedData.headers[index]
                if (header !== null) {
                    acc[header] = cell
                }
                return acc
            }, {})
        })

        const formattedData = arrData.map((item) => ({
            ...item,
            amount: convertToMillUnit(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputDateFormat)
        }))

        onSubmit(formattedData)
    }

    return (
        <div
            className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24"
        >
            <Card
                className="border-none drop-shadow-sm bg-white"
            >
                <CardHeader
                    className="gap-y-2 lg:flex-row lg:items-center lg:justify-between"
                >
                    <CardTitle
                        className="text-2xl font-bold text-gray-900"
                    >
                        Import transactions
                    </CardTitle>
                    <div
                        className="flex flex-col items-center space-x-2 lg:space-x-2 lg:flex-row gap-y-2"
                    >
                        <Button
                            onClick={handleContinue}
                            className={cn(
                                "bg-emerald-400 text-slate-900 w-full lg:w-auto",
                                progress < requiredOptions.length && "bg-slate-600 "
                            )}
                            disabled={progress < requiredOptions.length}
                        >
                            Continue ({progress} / {requiredOptions.length})
                        </Button>
                        <Button
                            variant="default"
                            onClick={onCancel}
                            className="w-full lg:w-auto lg:mt-0"
                        >
                            <X
                                className="w-6 h-6 mr-2"
                            />
                            Cancel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={header}
                        body={body}
                        selected={selected}
                        onTableHeadChange={onTableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>
);
};

export default ImportCard;