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
import { insertCategorySchema } from "@/db/schemas";
import {useCreateCategory} from "@/features/categories/api/useCreateCategory";
import CategoryForm from "@/features/categories/components/category-form";
import {useNewCategory} from "@/features/categories/hooks/useNewCategory";

const formSchema = insertCategorySchema.pick({
    name: true,
});
type formValues = z.input<typeof formSchema>;

const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory()

    const mutation = useCreateCategory();

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
                            className="h-auto w-auto text-2xl font-semibold text-black -translate-x-2.5"
                        />
                            Visor
                    </SheetTitle>
                    <Separator />
                    <SheetDescription
                        className="text-lg font-semibold text-black"
                    >
                            Create a new category
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
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

export default NewCategorySheet;