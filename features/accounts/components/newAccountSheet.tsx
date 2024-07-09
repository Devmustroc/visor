import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {useNewAccount} from "@/features/accounts/hooks/useNewAccount";
import AccountForm from "@/features/accounts/components/account-form";
import {z} from "zod";
import {useCreateAccount} from "@/features/accounts/api/useCreateAccount";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {insertAccountSchema} from "@/db/schemas";

const formSchema = insertAccountSchema.pick({
    name: true,
});
type formValues = z.input<typeof formSchema>;

const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount()

    const mutation = useCreateAccount();

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
                        className="flex flex-col items-center justify-center"
                    >
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={500}
                            height={200}
                            className="h-auto w-auto cext-2xl font-semibold text-black -translate-x-2.5"
                        />

                            Visor
                    </SheetTitle>
                    <Separator />
                    <SheetDescription
                        className="text-lg font-semibold text-black"
                    >
                            Create a new account
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: '',
                    }}
                />
            </SheetContent>
        </Sheet>
    );
};

export default NewAccountSheet;