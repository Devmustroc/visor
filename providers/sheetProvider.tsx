'use client';

import { useMountedState } from "react-use";

import React from 'react';

import NewAccountSheet from "@/features/accounts/components/newAccountSheet";
import {EditAccountSheet} from "@/features/accounts/components/editAccountSheet";
import {EditCategorySheet} from "@/features/categories/components/editCategorySheet";
import NewCategorySheet from "@/features/categories/components/newCategorySheet";
import NewTransactionSheet from "@/features/transactions/components/newTransactionSheet";
import {EditTransactionSheet} from "@/features/transactions/components/editTransactionSheet";


export const SheetProvider = () => {

    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
            <NewCategorySheet />
            <EditCategorySheet />
            <NewTransactionSheet />
            <EditTransactionSheet />
        </>
    )
}