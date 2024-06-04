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
import {useOpenAccount} from "@/features/accounts/hooks/useOpenAccount";
import {useConfirm} from "@/hooks/use-confirm";
import {useDeleteAccount} from "@/features/accounts/api/useDeleteAccount";

type Props = {
    id: string;
}


const Actions = ({ id }: Props) => {
    const { onOpen } = useOpenAccount();
    const deleteMutation = useDeleteAccount(id);
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