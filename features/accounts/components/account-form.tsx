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
import {insertAccountSchema} from "@/db/schemas";

const formSchema = insertAccountSchema.pick({
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
                                disabled,
                            }: formProps) => {

    const router = useRouter();
    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: formValues) => {
        onSubmit(values);
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
                                    placeholder="Account name"
                                    {...field}
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

export default AccountForm;