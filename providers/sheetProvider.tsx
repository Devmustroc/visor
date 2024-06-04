'use client';

import { useMountedState } from "react-use";

import React from 'react';

import NewAccountSheet from "@/features/accounts/components/newAccountSheet";
import {EditAccountSheet} from "@/features/accounts/components/editAccountSheet";
import {EditCategorySheet} from "@/features/categories/components/editCategorySheet";
import NewCategorySheet from "@/features/categories/components/newCategorySheet";


export const SheetProvider = () => {

    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
            <EditCategorySheet />
            <NewCategorySheet />
        </>
    )
}