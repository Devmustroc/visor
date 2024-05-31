import React from 'react';
import LogoHeader from "@/components/Header/logoHeader";
import Navigation from "@/components/Header/navigation";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import Welcome from "@/components/Header/welcome";


const Header = () => {
    return (
        <div
            className="bg-gradient-to-b from-emerald-500 to-emerald-300 px-4 py-8 lg:px-14 pb-36"
        >
            <div
                className="max-w-screen-2xl mx-auto"
            >
                <div
                    className="w-full flex items-center justify-between mb-14"
                >
                    <div
                        className="flex items-center space-x-4 lg:gap-x-16"
                    >
                        <LogoHeader />
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/"/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </ClerkLoading>
                </div>
                <Welcome />
            </div>
        </div>
    );
};

export default Header;