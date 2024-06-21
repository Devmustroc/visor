'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Loader2, Plus} from "lucide-react";
import {useNewAccount} from "@/features/accounts/hooks/useNewAccount";
import {columns} from "@/app/(dashboard)/accounts/_dataTable/column";
import {DataTable} from "@/app/(dashboard)/accounts/_components/data-table";
import {useGetAccounts} from "@/features/accounts/api/useGetAccounts";
import {Skeleton} from "@/components/ui/skeleton";
import {useBulkDeleteAccount} from "@/features/accounts/api/useBulkDeleteAccounts";
import {useNewTransaction} from "@/features/transactions/hooks/useNewTransaction";
import {useGetTransactions} from "@/features/transactions/api/useGetTransactions";
import {useBulkDeleteTransactions} from "@/features/transactions/api/useBulkDeleteTransactions";

const TransactionsPage = () => {
    const newTransaction = useNewTransaction();
    const transactionQuery = useGetTransactions();
    const deleteTransactions = useBulkDeleteTransactions()
    const transactions = transactionQuery.data || [];

    const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

    if(transactionQuery.isLoading) {
        return (
            <div
                className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24"
            >
                <Card
                    className="border-none drop-shadow-sm bg-white"
                >
                    <CardHeader>
                        <Skeleton
                            className="h-8 w-48"
                        />
                    </CardHeader>
                    <CardContent>
                        <div
                            className="h-[500px] w-full flex items-center justify-center"
                        >
                            <Loader2
                                className="w-12 h-12 text-gray-400 animate-spin"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
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
                        Transactions Overview
                    </CardTitle>
                    <Button
                        onClick={newTransaction.onOpen}
                        className="bg-emerald-500 text-white hover:bg-emerald-600 lg:w-32 lg:mt-0 mt-4"
                    >
                        <Plus
                            className="w-6 h-6 mr-2"
                        />
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ids});
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;