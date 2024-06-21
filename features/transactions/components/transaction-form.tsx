'use client';

import React from 'react';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {insertAccountSchema, insertTransactionSchema} from "@/db/schemas";
import Select from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import {Textarea} from "@/components/ui/textarea";
import AmountInput from "@/components/ui/amountInput";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional()
    });

const apiSchema = insertTransactionSchema.omit({
        id: true,
})

type formValues = z.input<typeof formSchema>;
type apiFormValues = z.input<typeof apiSchema>;


type formProps = {
    id?: string;
    defaultValues?: formValues;
    onSubmit: (values: apiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: {
        label: string;
        value: string;
    }[],
    categoryOptions: {
        label: string;
        value: string;
    }[],
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
}

const TransactionForm = ({
                                id,
                                defaultValues,
                                onSubmit,
                                onDelete,
                                disabled,
                                accountOptions,
                                categoryOptions,
                                onCreateAccount,
                                onCreateCategory,

                            }: formProps) => {

    const router = useRouter();
    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: formValues) => {

        /*nSubmit(values);*/
        console.log(values);
        router.refresh();

    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField
                    name="accountId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an account"
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an account"
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Date
                            </FormLabel>
                            <FormControl>
                                <DatePicker
                                    onChange={field.onChange}
                                    disabled={disabled}
                                    value={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="payee"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Payee
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="Add a payee"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <AmountInput
                                    {...field}
                                    disabled={disabled}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="notes"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disabled}
                                    placeholder="Give a note"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full mt-4 mb-4"
                    disabled={disabled}
                >
                    {id ? "Save changes" : "Create account"}
                </Button>
                {!!id && (
                    <Button
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full"
                        variant="outline"
                    >
                        <Trash className="size-4 mr-2" />
                        Delete account
                    </Button>
                )}
            </form>
        </Form>
    )
};

export default TransactionForm;