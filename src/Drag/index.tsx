/**
 * @file Drag
 * @date 2022-06-22
 * @author xuejie.he
 * @lastModify xuejie.he 2022-06-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useRef } from "react";
import { stopSelect } from "../Scroll/Unit/noSelected";
import { DragMoveProps, DragPramsProps, PointProps } from "../type";
import { getScrollValue } from "../unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DragProps extends React.HTMLAttributes<HTMLDivElement> {
    handleDragStart?: (res: DragPramsProps) => void;

    handleDragMove?: (res: DragMoveProps) => void;

    handleDragEnd?: (res: DragPramsProps) => void;

    children?: React.ReactNode;

    active: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Drag = forwardRef<HTMLDivElement, DragProps>(
    (
        {
            children,
            handleDragStart,
            handleDragEnd,
            handleDragMove,
            onMouseDown,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            active,
            className,
            onFocus,
            onBlur,
            ...props
        },
        ref,
    ) => {
        Drag.displayName = "Drag";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const mouseDownStatus = useRef(false);

        const touchStartStatus = useRef(false);

        const selectedFn = useRef<typeof document.onselectstart>(null);

        const point = useRef<PointProps>({
            offsetX: 0,
            offsetY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /**
         * 移动的通用事件
         */
        const handleMove = (x: number, y: number, clientX: number, clientY: number) => {
            point.current.x = x - point.current.offsetX;
            point.current.y = y - point.current.offsetY;
            handleDragMove?.({
                x,
                y,
                clientX,
                clientY,
                width: point.current.width,
                height: point.current.height,
                offsetX: point.current.offsetX,
                offsetY: point.current.offsetY,
            });
        };

        /**
         * 鼠标移动
         */
        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.pageX, e.pageY, e.clientX, e.clientY);
        };

        // 当鼠标 或者手 弹起时的通用事件
        const handleUp = (x: number, y: number, clientX: number, clientY: number) => {
            handleDragEnd?.({
                x,
                y,
                clientX,
                clientY,
                width: point.current.width,
                height: point.current.height,
                offsetX: point.current.offsetX,
                offsetY: point.current.offsetY,
            });

            document.onselectstart = selectedFn.current;
            point.current = {
                x: 0,
                y: 0,
                offsetX: 0,
                offsetY: 0,
                width: 0,
                height: 0,
            };
            selectedFn.current = null;
        };

        /**
         * 鼠标松开
         */
        const handleMouseUp = (e: MouseEvent) => {
            handleUp(e.pageX, e.pageY, e.clientX, e.clientY);
            mouseDownStatus.current = false;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // 手或者鼠标 按下的通用事件
        const handleDown = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
        ) => {
            stopSelect(e, selectedFn, true);

            const scrollData = getScrollValue();
            const rect = e.currentTarget.getBoundingClientRect();
            const rectX = rect.left + scrollData.x;
            const rectY = rect.top + scrollData.y;

            let x = 0;
            let y = 0;

            if ("pageX" in e) {
                x = e.pageX;
                y = e.pageY;

                handleDragStart?.({
                    x,
                    y,
                    width: point.current.width,
                    height: point.current.height,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    offsetX: point.current.offsetX,
                    offsetY: point.current.offsetY,
                });
            } else {
                const position = e.changedTouches[0];
                x = position.pageX;
                y = position.pageY;
                handleDragStart?.({
                    x,
                    y,
                    width: point.current.width,
                    height: point.current.height,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    offsetX: point.current.offsetX,
                    offsetY: point.current.offsetY,
                });
            }

            point.current = {
                offsetX: x - rectX,
                offsetY: y - rectY,
                x: rectX,
                y: rectY,
                width: rect.width,
                height: rect.height,
            };
        };

        /**
         * 鼠标按下
         */
        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseDown?.(e);
            if (touchStartStatus.current) {
                return;
            }
            handleDown(e);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            mouseDownStatus.current = true;
        };

        /**
         * 触摸开始
         */
        const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchStart?.(e);
            if (mouseDownStatus.current) {
                return;
            }
            handleDown(e);
            touchStartStatus.current = true;
        };

        /**
         * 移动触摸
         */
        const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchMove?.(e);

            if (!touchStartStatus.current) {
                return;
            }
            const position = e.changedTouches[0];
            handleMove(position.pageX, position.pageY, position.clientX, position.clientY);
        };

        /**
         * 触摸结束
         */
        const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchEnd?.(e);

            if (!touchStartStatus.current) {
                return;
            }
            const position = e.changedTouches[0];
            handleUp(position.pageX, position.pageY, position.clientX, position.clientY);
            touchStartStatus.current = false;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        const classList: string[] = [];
        className && classList.push(className);
        active && classList.push("active");
        return (
            <div
                {...props}
                ref={ref}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                tabIndex={-1}
                onFocus={(e) => {
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    onBlur?.(e);
                }}
                className={classList.join(" ")}
            >
                {children}
            </div>
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Drag.displayName = "Drag";
