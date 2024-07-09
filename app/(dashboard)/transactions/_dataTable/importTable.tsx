import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import TableHeadSelect from "@/app/(dashboard)/transactions/_components/tableHeadSelect";

type Props = {
    headers: string[];
    body: string[][];
    selected: Record<string, string | null>;
    onTableHeadChange: (columnIndex: number,  value: string | null) => void;
}

const ImportTable = ({ headers, body, selected, onTableHeadChange }: Props) => {
    return (
        <div
            className="rounded-md border overflow-hidden"
        >
            <Table>
                <TableHeader
                    className="bg-muted"
                >
                    {
                        headers.map((_item, index) => {
                            return(
                                <TableHead
                                    key={index}
                                >
                                   <TableHeadSelect
                                        columnIndex={index}
                                        selectedColumn={selected}
                                        onChange={onTableHeadChange}

                                   />
                                </TableHead>
                            )
                        })
                    }
                </TableHeader>
                <TableBody>
                    { body.map((row, rowIndex) => {
                        return (
                            <TableRow
                                key={rowIndex}
                            >
                                {row.map((cell, index) => (
                                    <TableCell key={index}>
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ImportTable;