import React from 'react';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {insertAccountsSchema} from "@/db/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const formSchema = insertAccountsSchema.pick({
    name: true,
});

type formValues = z.input<typeof formSchema>;

type formProps = {
    id?: string;
    defaultValues?: formValues;
    onSubmit: (values: formValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled = false,
}: formProps) => {
    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: formValues) => {
        console.log(values)
    }

    const handleDelete = () => {
        onDelete?.()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                className="spayce-y-4 pt-4"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="e.g Cash, Credit Card, Savings Account"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default AccountForm;