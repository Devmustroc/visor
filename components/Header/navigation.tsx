'use client';

import React, {useState} from 'react';
import {usePathname} from "next/navigation";
import NavButton from "@/components/Header/navButton";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import  { useMedia } from 'react-use';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

const route = [
    {
        href: '/',
        label: 'Overview',
    },
    {
        href: '/transactions',
        label: 'Transactions',
    },
    {
        href: '/accounts',
        label: 'Accounts',
    },
    {
        href: '/categories',
        label: 'Categories',
    },
    {
        href: '/settings',
        label: 'Settings',
    },
]

const Navigation = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const isMobile = useMedia('(max-width: 1024px)', false);

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <Sheet
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-emerald-900/60 hover:bg-white hover:text-white border-none
                            focus-visible:ring-offset-0
                            focus-visible:ring-transparent focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-opacity-50 transition-colors"
                        >
                        <Menu
                            className="w-6 h-6 text-black"
                        />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side='left'
                    className="px-2"
                >
                    <nav
                        className="flex flex-col gap-y-2 pt-6"
                    >
                        {
                            route.map((item) => (
                                <Button
                                    key={item.href}
                                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                                    onClick={() => onClick(item.href)}
                                    className="w-full justify-start"
                                >
                                    {item.label}
                                </Button>
                            ))
                        }
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }
    return (
        <nav className="hidden lg:flex overflow-x-auto items-center gap-x-2">
            {
                route.map((item) => (
                    <NavButton
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        isActive = {pathname === item.href}
                    />
                ))
            }
        </nav>
    );
};

export default Navigation;