import {ClerkLoaded, ClerkLoading, SignIn} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import Image from "next/image";

export default function Page() {
    return (
        <div
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
        >
            <div
                className="h-full lg:flex flex-col items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-300"
            >
                <div
                    className="text-center space-y-2 pt-16 pb-2"
                >
                    <h1
                        className='font-extrabold text-4xl text-center text-white'
                    >
                        Welcome Back!
                    </h1>
                    <p
                        className="text-base text-black"
                    >
                        Login or Create account to get back to the dashboard
                    </p>
                </div>
                <div
                    className="flex items-center justify-center"
                >
                    <ClerkLoaded>
                        <SignIn path="/sign-in" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2
                            className="w-8 h-8 text-white animate-spin"
                        />
                    </ClerkLoading>
                </div>
            </div>
            <div
                className="h-full hidden lg:flex items-center justify-center"
            >
                <Image
                    src="/logo.svg"
                    alt="Login"
                    width={500}
                    height={500}
                    className="h-auto w-auto"
                />
            </div>
        </div>
    );
}
