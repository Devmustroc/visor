'use client';

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {Edit, MoreHorizontal, Trash} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";
import {useOpenTransaction} from "@/features/transactions/hooks/useOpenTransaction";
import {useDeleteTransaction} from "@/features/transactions/api/useDeleteTransaction";

type Props = {
    id: string;
}


const Actions = ({ id }: Props) => {
    const { onOpen } = useOpenTransaction();
    const deleteMutation = useDeleteTransaction(id);
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete Transaction."
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