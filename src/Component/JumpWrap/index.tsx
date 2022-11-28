/**
 * @file
 * @date 2022-08-25
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { ScrollComponent, ScrollProps } from "../../Scroll";
import { JumpContext } from "../Group/Unit/context";
import { useHashId } from "./../../useHashId";
import "./style.scss";
import { getScrollBody } from "./Unit/getScrollBody";
import Triangle from "./Unit/triangle";
import { getElements, useActiveStatus } from "./Unit/useActiveStatus";
import { findParent } from "./Unit/findParent";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const JumpWrap: React.FC<ScrollProps> = ({ children, style, ...props }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const id = useHashId("jumpWrap");

    const ref = useRef<HTMLDivElement | null>(null);

    const timer = useRef<number>();

    const [loading, setLoading] = useState(true);

    const { show, topActive, bottomActive, activeIndex, isBottom, update } = useActiveStatus(
        ref,
        id,
    );
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        void document.fonts.ready.then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        return () => {
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            update();
        }
    }, [loading, update]);

    useEffect(() => {
        let timer: null | number = null;
        const mainFn = () => {
            timer && window.clearTimeout(timer);
            timer = window.setTimeout(update);
        };

        window.addEventListener("resize", mainFn);
        return () => {
            window.removeEventListener("resize", mainFn);
            timer && window.clearTimeout(timer);
        };
    }, [update]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    // getElements
    const jumpTo = (n: number) => {
        const scrollBody = getScrollBody(ref.current);
        if (!scrollBody) {
            return;
        }
        if (n < 0) {
            n = 0;
        }

        const arr = getElements(id);

        if (n >= arr.length) {
            n = arr.length - 1;
        }
        let toEl: HTMLElement | null = null;
        for (let i = 0; i < arr.length; ) {
            const el = arr[i];
            const index = Number(el.getAttribute("data-index"));
            if (index === n) {
                toEl = el;
                i = arr.length;
            } else {
                ++i;
            }
        }
        if (!toEl) {
            return;
        }
        scrollBody.scrollTo({
            top: findParent(toEl, scrollBody),
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        timer.current && window.clearTimeout(timer.current);
        timer.current = window.setTimeout(update, 50);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <JumpContext.Provider value={id}>
            <ScrollComponent
                handleBarChange={handleScroll}
                style={style}
                ref={ref}
                hidden={{ x: true }}
                {...props}
            >
                {children}
            </ScrollComponent>
            {show && (
                <div className="floating_button">
                    <div
                        className="toTop_button"
                        onClick={(e) => {
                            if (!topActive || !e.nativeEvent.cancelable) {
                                return;
                            }

                            jumpTo(activeIndex.current - 1);
                        }}
                    >
                        <Triangle className="top_triangle" placement="top" active={topActive} />
                    </div>
                    <div
                        className="toBottom_button"
                        onClick={(e) => {
                            if (!bottomActive || isBottom || !e.nativeEvent.cancelable) {
                                return;
                            }

                            jumpTo(activeIndex.current + 1);
                        }}
                    >
                        <Triangle
                            placement="bottom"
                            active={bottomActive && !isBottom}
                            className="bottom_triangle"
                        />
                    </div>
                </div>
            )}
        </JumpContext.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default JumpWrap;
