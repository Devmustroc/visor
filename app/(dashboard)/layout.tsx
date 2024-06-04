import React from 'react';
import Header from "@/components/Header/header";
import {useNewAccount} from "@/features/accounts/hooks/useNewAccount";

const DashboardLayout = ({ children } : {children: React.ReactNode}) => {

    return (
        <>
            <Header />
            <main
                className="px-3 lg:px-14"
            >
                {children}
            </main>
        </>
    );
};

export default DashboardLayout;