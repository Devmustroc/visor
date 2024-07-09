import React from 'react';
import Link from "next/link";
import Image from "next/image";

const LogoHeader = () => {
    return (
        <Link
            href="/"
        >
            <div
                className="items-center hidden lg:flex cursor-pointer"
            >
                <div
                    className="flex flex-col items-center justify-center"
                >
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width="150"
                        height="150"
                        className="w-auto h-auto"
                    />
                    <p
                        className="font-extrabold text-4xl text-[#b45309] -translate-x-2.5"
                    >
                        Visor
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default LogoHeader;