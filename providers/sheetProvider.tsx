'use client';

import { useMountedState } from "react-use";

import React from 'react';

import NewAccountSheet from "@/features/accounts/components/newAccountSheet";

export const SheetProvider = () => {

    const isMounted = useMountedState();

    if (!isMounted()) return null;

    return (
        <>
            <NewAccountSheet />
        </>
    )
}