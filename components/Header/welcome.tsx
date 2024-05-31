"use client";

import React from 'react';
import {useUser} from "@clerk/nextjs";

const Welcome = () => {
    const { user, isLoaded } = useUser();
    return (
        <div
            className="spac-y-2 mb-4"
        >
            <h2
                className="text-2xl  lg:text-4xl text-white font-medium"
            >
                Welcome Back{ isLoaded ? ", " : " "} {user?.firstName}
            </h2>
            <p
                className="text-base text-muted-foreground"
            >
                This is Your Overview Report
            </p>
        </div>
    );
};

export default Welcome;