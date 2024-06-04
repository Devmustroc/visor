'use client';

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {Edit, MoreHorizontal, Trash} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";
import {useOpenCategory} from "@/features/categories/hooks/useOpenCategory";
import {useDeleteCategory} from "@/features/categories/api/useDeleteCategory";

type Props = {
    id: string;
}


const Actions = ({ id }: Props) => {
    const { onOpen } = useOpenCategory();
    const deleteMutation = useDeleteCategory(id);
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete transactions."
    );


    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    };
    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        size={"sm"}
                        className="w-8 h-8 p-0"
                    >
                        <MoreHorizontal
                            className="size-4"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit
                            className="size-4 mr-2"
                        />
                            Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash
                            className="size-4 mr-2"
                        />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Actions;