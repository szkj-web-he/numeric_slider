import { useEffect, useState } from "react";
import { isMobile } from "../../isMobile";

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
