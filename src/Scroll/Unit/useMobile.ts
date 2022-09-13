import { useEffect, useState } from "react";

const isMobile = (): boolean => {
    return window.matchMedia("(any-pointer:coarse)").matches;
};

export const useMobile = (): boolean => {
    const [state, setState] = useState(isMobile());

    useEffect(() => {
        const fn = () => {
            setState(isMobile());
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);
    return state;
};
