"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

const Home = () => {

    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated by checking localStorage
        const isAuthenticated = localStorage.getItem('authenticated');

        if (isAuthenticated) {
            router.push('/dashboard'); // If authenticated, redirect to the dashboard
        } else {
            router.push('/auth'); // If not authenticated, redirect to the login page
        }
    }, [router]);

    return <div>Loading...</div>;
};

export default Home;
