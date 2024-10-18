"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
    const [isScrollDisabled, setIsScrollDisabled] = useState(false);

    const disableScroll = () => {
        setIsScrollDisabled(true);
    };

    const enableScroll = () => {
        setIsScrollDisabled(false);
    };

    useEffect(() => {
        if (isScrollDisabled) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isScrollDisabled]);

    return (
        <ScrollContext.Provider value={{ isScrollDisabled, disableScroll, enableScroll }}>
            {children}
        </ScrollContext.Provider>
    );
};
