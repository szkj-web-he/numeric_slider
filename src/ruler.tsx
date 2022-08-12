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
        };
    }, []);

    useEffect(() => {
        if (!scaleData) {
            return;
        }
        const arr: ScoreRange[] = [];
        let min = -Infinity;
        for (let i = 0; i < scaleData.length; i++) {
            arr.push({
                value: scaleData[i].value,
                min,
                max: scaleData[i + 1] ? scaleData[i + 1].left / 2 : Infinity,
                x: scaleData[i].left,
            });
            if (scaleData[i + 1]) {
                min = scaleData[i + 1].left / 2;
            }
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
                    } else if (item.status === 2) {
                        return (
                            <div
                                className="scaleItem_big"
                                key={`scale${item.value}`}
                                style={{
                                    left: `${item.left}px`,
                                }}
                            >
                                <div className="scaleItem_icon" />
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
