'use client';

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {useNewAccount} from "@/features/accounts/hooks/useNewAccount";

const Page = () => {
    const { onOpen } = useNewAccount();

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={onOpen}>New Account</Button>
        </div>
    );
};

export default Page;