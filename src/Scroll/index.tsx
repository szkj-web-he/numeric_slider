/**
 * @file Scroll component
 * @date 2022-02-15
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getScrollValue } from "../unit";
import "./style.scss";
import DragBar from "./Unit/dragBar";
import { setScrollBar } from "./Unit/setScrollBar";
import { Point } from "./Unit/type";
import { useMobile } from "./Unit/useMobile";
import { ScrollBodyContext } from "./Unit/useScrollBody";
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
     * Is the default position for smooth scrollbars
     */
    isSmooth?: boolean;
    /**
     * Prevent event bubbling when mouse is on the bar
     */
    stopPropagation?: boolean;
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
            isSmooth,
            stopPropagation = true,
            bodyClassName,
            onTouchStartCapture,
            onTouchCancelCapture,
            onTouchEndCapture,
            ...props
        },
        ref,
    ) => {
        ScrollComponent.displayName = "ScrollComponent";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const scrollEl = useRef<HTMLDivElement | null>(null);

        const smoothRef = useRef(isSmooth);

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

        useEffect(() => {
            const node = scrollEl.current;
            let destroy = false;
            let observer: MutationObserver | null = null;
            const fn = () => {
                if (destroy) {
                    return;
                }

                setScrollBar(node);
            };

            if (hover && node) {
                observer = new MutationObserver(fn);
                observer.observe(node, {
                    subtree: true,
                    childList: true,
                    attributes: true,
                    characterData: true,
                });
            }
            return () => {
                observer?.disconnect();
                destroy = true;
            };
        }, [hover]);

        useEffect(() => {
            let destroy = false;
            const fn = () => {
                const node = scrollEl.current;
                setScrollBar(node);
            };
            let timer: number | null = null;
            if (mobileStatus) {
                window.addEventListener("load", fn);
                void document.fonts.ready.then(fn);
                timer = window.setTimeout(() => {
                    if (destroy) {
                        return;
                    }
                    fn();
                }, 1000);
            }
            return () => {
                window.removeEventListener("load", fn);
                timer && window.clearTimeout(timer);
                destroy = true;
            };
        }, [mobileStatus]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
            setScrollBar(e.currentTarget);
            setHover(true);
            onTouchStartCapture?.(e);
        };
        const handleTouchCancel = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchCancelCapture?.(e);
            setHover(false);
        };
        const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchEndCapture?.(e);
            setHover(false);
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
        const handleMouseLeave = () => {
            if (mobileStatus) {
                return;
            }
            setHover(false);
        };

        /**
         * 鼠标在纵轴滚动条上
         * 拖拽中
         */
        const handleDragMoveOfVertical = ({ pageY, offsetY }: Point) => {
            const node = scrollEl.current;
            if (!node) {
                return;
            }
            const y = pageY - offsetY;

            const { top } = node.getBoundingClientRect();

            const scrollData = getScrollValue();

            const val = y - (top + scrollData.y);

            node.scrollTo({
                top: (node.scrollHeight / node.offsetHeight) * val,
            });
        };

        /**
         * 展示滚动条
         */
        const showBar = () => {
            setFocus(true);
        };
        /**
         * 鼠标在横向滚动条上
         * 拖拽中
         */
        const handleDragMoveOfHorizontal = ({ pageX, offsetX }: Point) => {
            const node = scrollEl.current;
            if (!node) {
                return;
            }

            const x = pageX - offsetX;

            const { left } = node.getBoundingClientRect();

            const scrollData = getScrollValue();

            const val = x - (left + scrollData.x);

            node.scrollTo({
                left: (node.scrollWidth / node.offsetWidth) * val,
            });
        };

        const hiddenBar = () => {
            setFocus(false);
        };

        /********************* element ******************************************/
        /**
         * 纵向滚动条
         */
        const verticalBar =
            hidden === true || (typeof hidden === "object" && hidden?.y === true) ? (
                <></>
            ) : (
                <DragBar
                    className={`scroll_scrollBar__vertical ${
                        hover || focus || mobileStatus ? ` scroll_scrollBar__active` : ""
                    }`}
                    handleDragStart={showBar}
                    handleDragMove={handleDragMoveOfVertical}
                    handleDragEnd={hiddenBar}
                    handleDragCancel={hiddenBar}
                    stopPropagation={stopPropagation}
                />
            );

        /**
         * 横向滚动条
         */
        const horizontalBar =
            hidden === true || (typeof hidden === "object" && hidden?.x === true) ? (
                <></>
            ) : (
                <DragBar
                    className={`scroll_scrollBar__horizontal${
                        hover || focus || mobileStatus ? ` scroll_scrollBar__active` : ""
                    }`}
                    handleDragStart={showBar}
                    handleDragMove={handleDragMoveOfHorizontal}
                    handleDragEnd={hiddenBar}
                    handleDragCancel={hiddenBar}
                    stopPropagation={stopPropagation}
                />
            );

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <ScrollBodyContext.Provider value={scrollEl}>
                <div
                    className={`scroll_scrollContainer${className ? ` ${className}` : ""}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStartCapture={handleTouchStart}
                    onTouchCancelCapture={handleTouchCancel}
                    onTouchEndCapture={handleTouchEnd}
                    ref={ref}
                    style={Object.assign({}, width ? { width } : {}, height ? { height } : {})}
                    {...props}
                >
                    {verticalBar}
                    {horizontalBar}
                    <div
                        ref={scrollEl}
                        className={`scroll_scrollBody${bodyClassName ? ` ${bodyClassName}` : ""}`}
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
            </ScrollBodyContext.Provider>
        );
    },
);
ScrollComponent.displayName = "ScrollComponent";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
