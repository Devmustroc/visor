import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {useNewAccount} from "@/features/accounts/hooks/useNewAccount";
import AccountForm from "@/features/accounts/components/accountForm";

const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount()
    return (
        <Sheet
            open={isOpen}
            onOpenChange={onClose}
        >
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                    disabled={false}
                />
            </SheetContent>
        </Sheet>
    );
};

export default NewAccountSheet;