/**
 * @file
 * @date 2022-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { comms } from ".";
import { ScoreRange } from "./type";
import { ScaleProps, setScale } from "./unit";
import { useHashId } from "./useHashId";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

interface TempProps {
    setScaleRange: (res: ScoreRange[]) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ setScaleRange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [scaleData, setScaleData] = useState<ScaleProps[]>();

    const scaleDataRef = useRef<string>();

    const styleRef = useRef<HTMLStyleElement>();

    const timer = useRef<number>();

    const hashId = useHashId("ruler_");

    const destroy = useRef(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            const data = setScale();
            if (data && scaleDataRef.current !== JSON.stringify(data)) {
                setScaleData([...data.scale]);
                scaleDataRef.current = JSON.stringify(data.scale);
            }
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    useEffect(() => {
        return () => {
            timer.current && window.clearTimeout(timer.current);
            styleRef.current?.remove();
            destroy.current = true;
        };
    }, []);

    useEffect(() => {
        if (!scaleData) {
            return;
        }
        const arr: ScoreRange[] = [];
        let min = -Infinity;

        const start = scaleData?.[0].left ?? 0;
        const end = scaleData?.[1].left ?? 0;
        const s = (end - start) / 2;

        for (let i = 0; i < scaleData.length; i++) {
            arr.push({
                value: scaleData[i].value,
                min,
                max: scaleData[i + 1] ? scaleData[i].left + s : Infinity,
                x: scaleData[i].left,
            });
            min = scaleData[i].left + s;
        }
        setScaleRange([...arr]);
    }, [scaleData, setScaleRange]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    {
        const data = setScale();
        if (data && scaleDataRef.current !== JSON.stringify(data.scale)) {
            setScaleData([...data.scale]);
            scaleDataRef.current = JSON.stringify(data.scale);
        }
    }

    const matchLastNode = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        if (rect.left + rect.width <= document.body.offsetWidth - 5) {
            return;
        }
        if (timer.current) {
            window.clearTimeout(timer.current);
            timer.current = undefined;
        }
        styleRef.current?.remove();
        if (el.classList.contains(hashId)) {
            el.classList.remove(hashId);
        }

        timer.current = window.setTimeout(() => {
            if (destroy.current) {
                return;
            }
            {
                document.body.offsetHeight;
            }
            const rect = el.getBoundingClientRect();

            if (rect.left + rect.width > document.body.offsetWidth) {
                const style = document.createElement("style");

                style.innerHTML = `.${hashId}
       {left: -${rect.left + rect.width + 5 - document.body.offsetWidth}px}
        `;

                styleRef.current = style;
                document.body.append(styleRef.current);

                el.classList.add(hashId);
            }
            timer.current = undefined;
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="rulerContainer">
            <div className="ruler">
                {scaleData?.map((item) => {
                    if (item.status === 1) {
                        return (
                            <div
                                className="scaleItem_middle"
                                key={`scale${item.value}`}
                                style={{
                                    left: `${item.left}px`,
                                }}
                            />
                        );
                    } else if (item.status === 2 || item.status === 1.5) {
                        return (
                            <div
                                className="scaleItem_big"
                                key={`scale${item.value}`}
                                style={{
                                    left: `${item.left}px`,
                                }}
                            >
                                <div className="scaleItem_icon" />
                                {item.status === 2 && (
                                    <div
                                        className="scaleItemValue"
                                        ref={(el) => {
                                            if (item.value !== comms.config.totalScore) {
                                                return;
                                            }
                                            if (!el) {
                                                return;
                                            }

                                            matchLastNode(el);
                                        }}
                                    >
                                        {item.value}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return (
                        <div
                            className="scaleItem"
                            key={`scale${item.value}`}
                            style={{
                                left: `${item.left}px`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
