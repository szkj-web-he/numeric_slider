import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScoreRange } from "./type";
import { deepCloneData, ScaleProps, setScale } from "./unit";

const getState = (): undefined | [ScaleProps[], ScoreRange[]] => {
    const scaleArr = setScale();
    console.log("getState");
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
    const stateRef = useRef<ReturnType<typeof getState>>();

    const [state, setState] = useState(() => getState());

    useLayoutEffect(() => {
        stateRef.current = deepCloneData(state);
    }, [state]);

    useEffect(() => {
        const fn = () => {
            console.log(213);
            const data = getState();
            if (JSON.stringify(data) === JSON.stringify(stateRef.current)) {
                return;
            }
            stateRef.current = deepCloneData(data);
            setState(data);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    return state;
};
