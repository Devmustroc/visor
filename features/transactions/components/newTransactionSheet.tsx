import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {z} from "zod";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import { insertTransactionSchema } from "@/db/schemas";
import {useNewTransaction} from "@/features/transactions/hooks/useNewTransaction";
import {useCreateTransaction} from "@/features/transactions/api/useCreateTransaction";
import {useCreateCategory} from "@/features/categories/api/useCreateCategory";
import {useGetCategories} from "@/features/categories/api/useGetCategories";
import {useGetAccounts} from "@/features/accounts/api/useGetAccounts";
import {useCreateAccount} from "@/features/accounts/api/useCreateAccount";
import TransactionForm from "@/features/transactions/components/transaction-form";
import {Loader2} from "lucide-react";

const formSchema = insertTransactionSchema.omit({
        id: true,
})
type formValues = z.input<typeof formSchema>;

const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();

    const mutation = useCreateTransaction();
    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();

    const onCreateCategory = (name: string) => categoryMutation.mutate({
            name,
    });

    const categoryOptions = (categoryQuery.data ?? []).map((category) => {
        return {
            label: category.name,
            value: category.id
        }
    });

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();

    const onCreateAccount = (name: string) => accountMutation.mutate({
        name,
    });

    const accountOptions = (accountQuery.data ?? []).map((account) => {
        return {
            label: account.name,
            value: account.id
        }
    });

    const isPending = mutation.isPending || categoryMutation.isPending || accountMutation.isPending;
    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

    const onSubmit = (value: formValues) => {
        mutation.mutate(value, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    return (
        <Sheet
            open={isOpen}
            onOpenChange={onClose}
        >
            <SheetContent
                className="max-w-md bg-gradient-to-b from-emerald-500 via-emerald-400 to-white border-none"
            >
                <SheetHeader
                    className="flex flex-col space-y-2 text-center sm:text-center mt-4"
                >
                    <SheetTitle
                        className="flex flex-col items-center justify-start space-y-2 text-center sm:text-center mt-4 md:flex-row md:items-center md:justify-center md:space-x-2 md:space-y-0"
                    >
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={100}
                            height={150}
                            className="rounded-full translate-x-1"
                        />
                        <h3
                            className="text-4xl font-extrabold text-black"
                        >
                            Visor
                        </h3>
                    </SheetTitle>
                    <Separator />
                    <SheetDescription
                        className="text-lg font-semibold text-black"
                    >
                            Create a new Transaction
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (
                        <div
                            className="absolue inset-0 flex flex-items justify-center"
                        >
                            <Loader2
                                className="w-6 h-6 animate-spin"
                            />
                        </div>
                    ) : (
                        <TransactionForm
                            onSubmit={onSubmit}
                            disabled={isPending}
                            categoryOptions={categoryOptions}
                            accountOptions={accountOptions}
                            onCreateCategory={onCreateCategory}
                            onCreateAccount={onCreateAccount}
                        />
                    )
                }

            </SheetContent>
        </Sheet>
    );
};

export default NewTransactionSheet;