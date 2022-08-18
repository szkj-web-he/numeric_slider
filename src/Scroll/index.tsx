/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { stopSelect } from "./Unit/noSelected";
import { setScrollBar } from "./Unit/setScrollBar";
import { useMobile } from "./Unit/useMobile";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface ScrollProps extends React.DOMAttributes<HTMLDivElement> {
    /**
     * scroll content
     */
    children?: React.ReactNode;
    /**
     * width of this component
     */
    width?: string;
    /**
     * width of this component
     */
    height?: string;
    /**
     * handler scroll bar change
     */
    handleBarChange?: (res: {
        left: number;
        top: number;
        scrollHeight: number;
        scrollWidth: number;
        offsetHeight: number;
        offsetWidth: number;
        clientHeight: number;
        clientWidth: number;
    }) => void;
    /**
     * default scrollTop
     */
    defaultScrollTop?: number;
    /**
     * default scrollLeft
     */
    defaultScrollLeft?: number;
    /**
     * className of scroll component wrap
     */
    className?: string;
    /**
     * style of scroll component body
     */
    style?: React.CSSProperties;
    /**
     * className of scroll component body
     */
    bodyClassName?: string;
    /**
     * hidden scrollbar
     */
    hidden?: boolean | { x?: boolean; y?: boolean };
    /**
     * Prevent event bubbling when mouse is on the bar
     */
    stopPropagation?: boolean;
    /**
     * Is the default position for smooth scrollbars
     */
    isSmooth?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ScrollComponent = forwardRef<HTMLDivElement, ScrollProps>(
    (
        {
            hidden,
            children,
            width,
            height,
            handleBarChange,
            defaultScrollTop,
            defaultScrollLeft,
            className,
            style,
            onMouseEnter,
            onMouseLeave,
            stopPropagation = true,
            isSmooth,
            bodyClassName,
            ...props
        },
        ref,
    ) => {
        ScrollComponent.displayName = "ScrollComponent";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const scrollEl = useRef<HTMLDivElement | null>(null);

        const smoothRef = useRef(isSmooth);

        const point = useRef(0);

        const selectedFn = useRef<typeof document.onselectstart>(null);

        const [focus, setFocus] = useState(false);

        const [hover, setHover] = useState(false);

        const mobileStatus = useMobile();

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useLayoutEffect(() => {
            smoothRef.current = isSmooth;
        }, [isSmooth]);

        useEffect(() => {
            const node = scrollEl.current;
            if (
                typeof defaultScrollTop === "number" &&
                node &&
                defaultScrollTop !== node.scrollTop
            ) {
                node.scrollTo({
                    top: defaultScrollTop,
                    behavior: smoothRef.current ? "smooth" : "auto",
                });
            }
        }, [defaultScrollTop]);

        useEffect(() => {
            const node = scrollEl.current;
            if (
                typeof defaultScrollLeft === "number" &&
                node &&
                defaultScrollLeft !== node.scrollLeft
            ) {
                node.scrollTo({
                    left: defaultScrollLeft,
                    behavior: smoothRef.current ? "smooth" : "auto",
                });
            }
        }, [defaultScrollLeft]);

        useEffect(() => {
            const node = scrollEl.current;
            if (!node) {
                return;
            }

            if (focus || hover) {
                setScrollBar(node);
            }
        }, [focus, hover]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleVerticalMove = (e: MouseEvent) => {
            const y = e.pageY;

            let move = y - point.current;
            point.current = y;

            const node = scrollEl.current;
            if (node) {
                move = (move / node.offsetHeight) * node.scrollHeight;

                let value = node.scrollTop + move;
                if (value < 0) {
                    value = 0;
                } else if (value + node.offsetHeight > node.scrollHeight) {
                    value = node.scrollHeight - node.offsetHeight;
                }

                node.scrollTo({
                    top: value,
                });
            }
        };

        const handleVerticalUp = () => {
            point.current = 0;
            document.onselectstart = selectedFn.current;
            selectedFn.current = null;
            setFocus(false);
            document.removeEventListener("mousemove", handleVerticalMove);
            document.removeEventListener("mouseup", handleVerticalUp);
        };

        const handleHorizontalMove = (e: MouseEvent) => {
            const x = e.pageX;

            let move = x - point.current;
            point.current = x;

            const node = scrollEl.current;
            if (node) {
                move = (move / node.offsetWidth) * node.scrollWidth;
                let value = node.scrollLeft + move;
                if (value < 0) {
                    value = 0;
                } else if (value + node.offsetWidth > node.scrollWidth) {
                    value = node.scrollWidth - node.offsetWidth;
                }
                node.scrollTo({
                    left: value,
                });
            }
        };
        const handleHorizontalUp = () => {
            point.current = 0;
            document.onselectstart = selectedFn.current;
            selectedFn.current = null;
            setFocus(false);
            document.removeEventListener("mousemove", handleHorizontalMove);
            document.removeEventListener("mouseup", handleHorizontalUp);
        };

        /**
         * 监听滚动
         * @param {React.UIEvent<HTMLDivElement>} e event
         */
        const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
            const node = scrollEl.current;

            const el = e.currentTarget;
            handleBarChange?.({
                left: el.scrollLeft,
                top: el.scrollTop,
                scrollHeight: el.scrollHeight,
                scrollWidth: el.scrollWidth,
                offsetHeight: el.offsetHeight,
                offsetWidth: el.offsetWidth,
                clientHeight: el.clientHeight,
                clientWidth: el.clientWidth,
            });
            if (mobileStatus) {
                return;
            }
            setScrollBar(node);
        };

        /**
         * 当鼠标在滚动容器上时
         * 1. 重新计算滚动条尺寸
         */
        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseEnter?.(e);
            if (mobileStatus) {
                return;
            }
            setScrollBar(e.currentTarget);
            setHover(true);
        };

        /**
         * 当鼠标 离开 滚动容器上时
         */
        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseLeave?.(e);
            if (mobileStatus) {
                return;
            }
            setHover(false);
        };

        /**
         * 鼠标在纵向滚动条上 按下时
         * @param e
         */
        const handleMouseDownOnVerticalBar = (e: React.MouseEvent<HTMLDivElement>) => {
            stopSelect(e, selectedFn, stopPropagation);

            point.current = e.pageY;
            setFocus(true);
            document.addEventListener("mousemove", handleVerticalMove);
            document.addEventListener("mouseup", handleVerticalUp);
        };

        /**
         * 鼠标在横向滚动条上 按下时
         * @param e
         */
        const handleMouseDownOnHorizontalBar = (e: React.MouseEvent<HTMLDivElement>) => {
            stopSelect(e, selectedFn, stopPropagation);
            setFocus(true);
            point.current = e.pageX;
            document.addEventListener("mousemove", handleHorizontalMove);
            document.addEventListener("mouseup", handleHorizontalUp);
        };
        /********************* element ******************************************/
        /**
         * 纵向滚动条
         */
        const verticalBar =
            mobileStatus ||
            hidden === true ||
            (typeof hidden === "object" && hidden?.y === true) ? (
                <></>
            ) : (
                <div
                    className={`scroll_scrollBar__vertical${hover || focus ? " active" : ""}`}
                    onMouseDown={handleMouseDownOnVerticalBar}
                    onClick={(e) => stopPropagation && e.stopPropagation()}
                />
            );

        /**
         * 横向滚动条
         */
        const horizontalBar =
            mobileStatus ||
            hidden === true ||
            (typeof hidden === "object" && hidden?.x === true) ? (
                <></>
            ) : (
                <div
                    className={`scroll_scrollBar__horizontal${hover || focus ? " active" : ""}`}
                    onMouseDown={handleMouseDownOnHorizontalBar}
                    onClick={(e) => stopPropagation && e.stopPropagation()}
                />
            );

        const containerClassName = ["scroll_scrollContainer"];
        className && containerClassName.push(className);

        const bodyClassNameList = ["scroll_scrollBody"];
        bodyClassName && bodyClassNameList.push(bodyClassName);
        mobileStatus && bodyClassNameList.push("scroll_scrollContainer__mobile");

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={containerClassName.join(" ")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                style={Object.assign({}, width ? { width } : {}, height ? { height } : {})}
                {...props}
            >
                {verticalBar}
                {horizontalBar}
                <div
                    ref={scrollEl}
                    className={bodyClassNameList.join(" ")}
                    style={Object.assign(
                        {},

                        style,

                        hidden === true ||
                            (typeof hidden === "object" && hidden?.x === true
                                ? { overflowX: "hidden" }
                                : {}),

                        hidden === true ||
                            (typeof hidden === "object" && hidden?.y === true
                                ? { overflowY: "hidden" }
                                : {}),
                    )}
                    onScroll={handleScroll}
                >
                    {children}
                </div>
            </div>
        );
    },
);
ScrollComponent.displayName = "ScrollComponent";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
