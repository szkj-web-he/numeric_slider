/**
 * @file 拖拽的柄
 * @date 2022-09-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Point, ScoreOption } from "../type";
import { getScrollValue } from "../unit";
import { useTouch } from "./useTouch";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 开始拖拽
     */
    handleDragStart?: (res: Point) => void;
    /**
     * 拖拽移动中
     */
    handleDragMove?: (res: Point) => void;
    /**
     * 拖拽结束
     */
    handleDragEnd?: (res: Point) => void;
    /**
     * 拖拽取消
     */
    handleDragCancel?: () => void;

    elder: ScoreOption[];

    /**
     * 在当前节点之后的所有节点
     */
    younger: ScoreOption[];

    sibling: Record<string, HTMLDivElement | null>;

    value: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, TempProps>(
    (
        {
            handleDragStart,
            handleDragMove,
            handleDragEnd,
            handleDragCancel,
            children,
            className,
            elder,
            younger,
            value,
            sibling,
            ...props
        },
        ref,
    ) => {
        Temp.displayName = "DragBar";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const timer = useRef<number>();

        const offset = useRef({
            x: 0,
            y: 0,
        });

        const isLast = useMemo(() => {
            const sameScore = younger.filter((item) => item.value === value);
            if (sameScore.length) {
                return false;
            }
            return true;
        }, [value, younger]);

        const globalClass = useRef<HTMLStyleElement>();

        const cRef = useTouch(
            (res) => {
                timer.current && window.clearTimeout(timer.current);
                timer.current = undefined;
                //开始
                const node = cRef.current;
                if (!node) {
                    return;
                }
                const scrollData = getScrollValue();
                const rect = node.getBoundingClientRect();
                const left = rect.left + scrollData.x;
                const top = rect.top + scrollData.y;

                offset.current = {
                    x: res.pageX - left,
                    y: res.pageY - top,
                };

                const pointerStyle = window.getComputedStyle(node, null).cursor;
                globalClass.current = document.createElement("style");
                globalClass.current.innerHTML = `
                *{
                    cursor:${pointerStyle} !important;
                }import { useState } from 'react';
import { useMemo } from 'react';

                `;
                document.head.append(globalClass.current);
                handleDragStart?.({
                    offsetX: offset.current.x,
                    offsetY: offset.current.y,
                    pageX: res.pageX,
                    pageY: res.pageY,
                    clientX: res.clientX,
                    clientY: res.clientY,
                });
            },
            (res) => {
                //移动中
                timer.current && window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => {
                    timer.current = undefined;
                    handleDragMove?.({
                        offsetX: offset.current.x,
                        offsetY: offset.current.y,
                        pageX: res.pageX,
                        pageY: res.pageY,
                        clientX: res.clientX,
                        clientY: res.clientY,
                    });
                });
            },
            (res) => {
                //结束移动
                timer.current && window.clearTimeout(timer.current);
                timer.current = undefined;
                globalClass.current?.remove();
                globalClass.current = undefined;
                handleDragEnd?.({
                    offsetX: offset.current.x,
                    offsetY: offset.current.y,
                    pageX: res.pageX,
                    pageY: res.pageY,
                    clientX: res.clientX,
                    clientY: res.clientY,
                });
                offset.current = {
                    x: 0,
                    y: 0,
                };
            },
            () => {
                timer.current && window.clearTimeout(timer.current);
                timer.current = undefined;
                globalClass.current?.remove();
                globalClass.current = undefined;
                //取消移动
                handleDragCancel?.();
                offset.current = {
                    x: 0,
                    y: 0,
                };
            },
        );

        const [margin, setMargin] = useState({
            left: 8,
            right: 8,
        });

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useEffect(() => {
            return () => {
                timer.current && window.clearTimeout(timer.current);
                globalClass.current?.remove();
                globalClass.current = undefined;
            };
        }, []);

        useEffect(() => {
            /**
             * 找到同一个葡萄藤上的上一个节点
             */
            const filterBrother = () => {
                const sameScore = elder.filter((item) => item.value === value);
                const endScore = sameScore.length ? sameScore[sameScore.length - 1] : undefined;
                if (endScore) {
                    return sibling[endScore.code];
                }
                return undefined;
            };

            const fn = () => {
                const preNode = filterBrother();
                if (preNode) {
                    const currentRect = cRef.current?.getBoundingClientRect();
                    const preRect = preNode.getBoundingClientRect();
                    const left =
                        currentRect && preRect.left > currentRect.left
                            ? preRect.left
                            : currentRect?.left;
                    const right =
                        currentRect && preRect.right > currentRect.right
                            ? currentRect.right
                            : preRect.right;

                    setMargin({
                        left: (left ?? 0) + 8 - (currentRect?.left ?? 0),
                        right: (currentRect?.right ?? 0) - (right ?? 0) + 8,
                    });
                } else {
                    setMargin({
                        left: 8,
                        right: 8,
                    });
                }
            };
            const timer = window.setTimeout(fn, 200);
            return () => {
                window.clearTimeout(timer);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [elder, sibling, value]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                ref={(el) => {
                    cRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                className={className ? `${className} ratedOption_itemWrap` : "ratedOption_itemWrap"}
                {...props}
            >
                <div
                    className="ratedOption_itemWifi1"
                    style={{
                        left: `${margin.left}px`,
                    }}
                />
                <div
                    className="ratedOption_itemWifi2"
                    style={{
                        right: `${margin.right}px`,
                    }}
                />
                <div className="ratedOption_itemTop" />
                <div className="ratedOption_itemContainer">{children}</div>

                {isLast ? (
                    <>
                        <div className="ratedOption_footerWifi1" />
                        <div className="ratedOption_footerWifi2" />
                    </>
                ) : (
                    <></>
                )}
            </div>
        );
    },
);
Temp.displayName = "DragBar";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
