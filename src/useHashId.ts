import { useMemo } from "react";

let IDS: string[] | null = null;

const setId = (id: string) => {
    if (Array.isArray(IDS)) {
        let status = false;
        for (let i = 0; i < IDS.length; ) {
            const item = IDS[i];
            if (item === id) {
                i = IDS.length;
                //重复
                status = true;
            } else {
                ++i;
            }
        }

        if (status) {
            return true;
        }
        IDS.push(id);
    } else {
        IDS = [id];
    }
};

const fn = (prefix?: string): string => {
    const l = 10;
    const psList = window.crypto.getRandomValues(new Uint32Array(l));
    let val = "";
    for (let i = 0; i < l; i++) {
        const v = window
            .encodeURIComponent(window.encodeURI(window.btoa(String(psList[i]))))
            .replace(/[^0-9a-z_-]/gi, "");
        const center = v.length / 2;
        const start = Math.floor(Math.random() * center);
        const end = Math.floor(Math.random() * center + (center - 1));

        val += v.slice(start, end);
    }

    let value = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * val.length - 1);
        value += val.slice(index, index + 1);
    }

    value += `_${Date.now().toString(36)}`;

    if (prefix) {
        value = `${prefix}-${value}`;
    }

    if (setId(value)) {
        return fn(prefix);
    }
    return value;
};

export const useHashId = (prefix?: string): string => {
    return useMemo(() => {
        return fn(prefix);
    }, [prefix]);
};
