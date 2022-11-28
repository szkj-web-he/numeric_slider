import { useEffect, useRef, useState } from "react";
import { ScoreRange } from "./type";
import { ScaleProps, setScale } from "./unit";

const getState = (): undefined | [ScaleProps[], ScoreRange[]] => {
    const scaleArr = setScale();
    if (!scaleArr) {
        return;
    }

    const arr: ScoreRange[] = [];
    let min = -Infinity;

    for (let i = 0; i < scaleArr.length; i++) {
        const item = scaleArr[i];
        const d = scaleArr[i + 1] ? (scaleArr[i + 1].left - item.left) / 2 : undefined;

        arr.push({
            value: item.value,
            min,
            max: d ? item.left + d : Infinity,
            x: item.left,
        });
        min = scaleArr[i].left;
    }
    return [scaleArr, arr];
};
export const useRuler = (): undefined | [ScaleProps[], ScoreRange[]] => {
    const stateRef = useRef(JSON.stringify(getState()));

    const [state, setState] = useState(getState());

    useEffect(() => {
        const fn = () => {
            const data = getState();
            if (JSON.stringify(data) === stateRef.current) {
                return;
            }
            stateRef.current = JSON.stringify(data);
            setState(data);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    return state;
};
