"use client"


import React, {useState} from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable, Row,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Trash} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    filterKey: string,
    onDelete?: (row: Row<TData>[]) => void,
    disabled?: boolean
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             filterKey,
                                             onDelete,
                                             disabled,
                                         }: DataTableProps<TData, TValue>) {
    const [ConfirmDialog, confirm] = useConfirm("Delete", "Are you sure you want to delete this item?")

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>
            <ConfirmDialog />
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter..."
                    value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div
                    className="flex items-center space-x-2"
                >
                    {
                        table.getFilteredSelectedRowModel().rows.length > 0 && (
                            <Button
                                disabled={disabled}
                                variant="destructive"
                                className="ml-auto"
                                onClick={ async () => {
                                    const ok = await confirm()

                                    if (ok) {

                                        onDelete?.(table.getFilteredSelectedRowModel().rows)
                                        table.resetRowSelection()
                                    }
                                }}
                            >
                                <Trash
                                    className="w-4 h-4 mr-2"
                                />
                                 Delete ({table.getFilteredSelectedRowModel().rows.length})
                            </Button>
                        )
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Filter by
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col items-center justify-center space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div
                    className="flex items-center justify-center space-x-2"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={cn(`
                        ${!table.getCanPreviousPage() ? "cursor-not-allowed text-gray-400" : "cursor-pointer bg-emerald-900"}
                    `)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={cn(`
                        ${!table.getCanNextPage() ? "cursor-not-allowed text-gray-400" : "cursor-pointer bg-emerald-900"}
                    `)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
