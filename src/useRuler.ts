import { useEffect, useRef, useState } from "react";
import { ScoreRange } from "./type";
import { ScaleProps, setScale } from "./unit";

const getState = (): undefined | [ScaleProps[], ScoreRange[]] => {
    const scaleData = setScale();
    if (!scaleData) {
        return;
    }

    const scaleArr = scaleData.scale;

    const arr: ScoreRange[] = [];
    let min = -Infinity;

    for (let i = 0; i < scaleArr.length; i++) {
        arr.push({
            value: scaleArr[i].value,
            min,
            max: scaleArr[i + 1] ? scaleArr[i + 1].left : Infinity,
            x: scaleArr[i].left,
        });
        min = scaleArr[i].left;
    }
    return [scaleData.scale, arr];
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
