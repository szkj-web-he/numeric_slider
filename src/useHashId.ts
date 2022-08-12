import { useId } from "react";

export const useHashId = (prefix?: string): string => {
    const id = useId();

    let start = prefix;
    if (!start) {
        const startChar = [65, 97][Math.round(Math.random())];
        start = String.fromCharCode(Math.round(Math.random() * 26) + startChar);
    }
    return id.replace(/[^0-9a-z_]/g, (a) => {
        let str = start as string;
        const arr = a.split("");
        for (let i = 0; i < arr.length; i++) {
            str += arr[i].charCodeAt(0);
        }
        return str;
    });
};
