import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";


type NavButtonProps = {
    href: string;
    label: string;
    isActive: boolean;
}

const NavButton = ({ href, label, isActive }: NavButtonProps) => {
    return (
        <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(`w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-black border-none focus-visible:ring-offset-0
                focus-visible:ring-transparent focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-opacity-50
            `,
                    isActive ? `bg-emerald-500 text-white` : `text-black`
                )}
        >
            <Link
                href={href}
            >
                {label}
            </Link>
        </Button>
    );
};

export default NavButton;