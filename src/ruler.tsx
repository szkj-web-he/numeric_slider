/**
 * @file
 * @date 2022-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { forceReflow, ScaleProps } from "./unit";
import { useHashId } from "./useHashId";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

interface TempProps {
    ruler?: ScaleProps[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ ruler }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const styleRef = useRef<HTMLStyleElement>();

    const hashId = useHashId("ruler_");

    const ref = useRef<HTMLDivElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        return () => {
            styleRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        let timer: null | number = null;
        const matchLastNode = (el: HTMLElement) => {
            const margin = 10;

            const rect = el.getBoundingClientRect();
            if (rect.left + rect.width <= document.documentElement.offsetWidth - margin) {
                return;
            }
            styleRef.current?.remove();
            if (el.classList.contains(hashId)) {
                el.classList.remove(hashId);
            }
            forceReflow();
            timer = window.setTimeout(() => {
                const style = document.createElement("style");

                style.innerHTML = `.${hashId}
       {left: -${rect.left + rect.width + margin - document.body.offsetWidth}px}
        `;

                styleRef.current = style;
                document.body.append(styleRef.current);

                el.classList.add(hashId);
            });
        };

        const fn = () => {
            const node = ref.current;

            if (!node) {
                return;
            }
            timer && window.clearTimeout(timer);

            const valueEls = node.getElementsByClassName("scaleItemValue");

            for (let i = 0; i < valueEls.length; i++) {
                const el = valueEls[i];
                if (el instanceof HTMLElement) {
                    matchLastNode(el);
                }
            }
        };

        fn();

        document.addEventListener("resize", fn);
        document.fonts.addEventListener("loading", fn);
        return () => {
            document.removeEventListener("resize", fn);
            document.fonts.removeEventListener("loading", fn);
            timer && window.clearTimeout(timer);
        };
    }, [hashId, ruler]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="rulerContainer">
            <div className="ruler" ref={ref}>
                {ruler?.map((item) => {
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
                                    <div className="scaleItemValue">{item.value}</div>
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
