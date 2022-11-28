/**
 * @file 拖拽的柄
 * @date 2022-09-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useRef } from "react";
import { Point } from "../type";
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
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, TempProps>(
    ({ handleDragStart, handleDragMove, handleDragEnd, handleDragCancel, ...props }, ref) => {
        Temp.displayName = "DragBar";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const timer = useRef<number>();

        const offset = useRef({
            x: 0,
            y: 0,
        });

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
                }
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
                {...props}
            />
        );
    },
);
Temp.displayName = "DragBar";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
