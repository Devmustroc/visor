"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {ArrowUpDown } from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
import {InferResponseType} from "hono";
import {client} from "@/lib/hono";
import Actions from "@/app/(dashboard)/accounts/_dataTable/actions";
import {format} from "date-fns";
import {formatCurrency} from "@/lib/utils";
import AccountColumn from "@/app/(dashboard)/transactions/_dataTable/accountColumn";
import CategoryColumn from "@/app/(dashboard)/transactions/_dataTable/categoryColumn";



export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>['data'][0]

export const columns: ColumnDef<ResponseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row}) => {
            const date = row.getValue('date') as Date;
            return (
                <span>
                    {format(date, 'dd/MM/yyyy')}
                </span>
            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row}) => {

            return (
                <CategoryColumn
                        id={row.original.id}
                        category={row.original.category}
                        categoryId={row.original.categoryId}
                />
            )
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row}) => {
            const amount = parseFloat(row.getValue('amount'));
            return (
                <Badge
                    variant={amount < 0 ? "danger" : "success"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {formatCurrency(amount)}
                </Badge>
            )
        }
    },
    {
        accessorKey: "payee",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row}) => {
            return (
                <span>
                    {row.original.payee}
                </span>
            )
        }
    },
    {
        accessorKey: "Account",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    account
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row}) => {
            return (
                <AccountColumn
                    id={row.original.id}
                    account={row.original.account}
                    accountId={row.original.accountId}
                />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions id={row.original.id} />
    },
];
