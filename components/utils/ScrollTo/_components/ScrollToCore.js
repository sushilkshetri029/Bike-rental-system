"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ScrollToCore = () => {
    const searchParams = useSearchParams();
    const scrollTo = searchParams.get('scrollTo');

    // Scroll to the element with the id provided in the URL
    useEffect(() => {
        if (scrollTo) {
            const element = document.getElementById(scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [scrollTo]);

    return null;
}

export default ScrollToCore;