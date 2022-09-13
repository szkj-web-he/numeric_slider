/**
 * @file 拖拽的柄
 * @date 2022-09-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useRef } from "react";
import { Point } from "../type";
import { getScrollValue } from "../unit";
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
    /**
     * 是否阻止冒泡
     */
    stopPropagation?: boolean;
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
            onMouseDown,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onTouchCancel,
            stopPropagation = true,
            ...props
        },
        ref,
    ) => {
        Temp.displayName = "DragBar";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const touchStatus = useRef(false);

        const mouseDownStatus = useRef(false);

        const offset = useRef({
            x: 0,
            y: 0,
        });

        const selectedFn = useRef<typeof document.onselectstart>(null);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const removeSelect = (e: React.TouchEvent | React.MouseEvent) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            e.nativeEvent.stopImmediatePropagation();
            window.getSelection()?.removeAllRanges();
            selectedFn.current = document.onselectstart;
            document.onselectstart = () => false;
        };

        const resetSelect = () => {
            document.onselectstart = selectedFn.current;
            selectedFn.current = null;
            offset.current = {
                x: 0,
                y: 0,
            };
            touchStatus.current = false;
            mouseDownStatus.current = false;
        };

        const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchStart?.(e);
            if (mouseDownStatus.current) {
                return;
            }

            touchStatus.current = true;
            removeSelect(e);

            const scrollData = getScrollValue();
            const rect = e.currentTarget.getBoundingClientRect();
            const left = rect.left + scrollData.x;
            const top = rect.top + scrollData.y;
            const event = e.changedTouches[0];
            offset.current = {
                x: event.pageX - left,
                y: event.pageY - top,
            };

            handleDragStart?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: event.pageX,
                pageY: event.pageY,
                clientX: event.clientX,
                clientY: event.clientY,
            });

            window.addEventListener("blur", handleTouchBlur);
        };

        const handleTouchBlur = () => {
            if (!touchStatus.current) {
                return;
            }
            resetSelect();
            handleDragCancel?.();
            window.removeEventListener("blur", handleTouchBlur);
        };

        const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchMove?.(e);
            if (!touchStatus.current) {
                return;
            }

            const event = e.changedTouches[0];

            handleDragMove?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: event.pageX,
                pageY: event.pageY,
                clientX: event.clientX,
                clientY: event.clientY,
            });
        };

        const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchEnd?.(e);

            if (!touchStatus.current) {
                return;
            }

            const event = e.changedTouches[0];
            resetSelect();
            handleDragEnd?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: event.pageX,
                pageY: event.pageY,
                clientX: event.clientX,
                clientY: event.clientY,
            });
            window.removeEventListener("blur", handleTouchBlur);
        };

        const handleTouchCancel = (e: React.TouchEvent<HTMLDivElement>) => {
            onTouchCancel?.(e);

            if (!touchStatus.current) {
                return;
            }
            resetSelect();
            handleDragCancel?.();
            window.removeEventListener("blur", handleTouchBlur);
        };

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseDown?.(e);
            if (touchStatus.current) {
                return;
            }
            removeSelect(e);

            const scrollData = getScrollValue();
            const rect = e.currentTarget.getBoundingClientRect();
            const left = rect.left + scrollData.x;
            const top = rect.top + scrollData.y;

            offset.current = {
                x: e.pageX - left,
                y: e.pageY - top,
            };
            handleDragStart?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY,
            });

            mouseDownStatus.current = true;
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("blur", handleMouseCancel);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!mouseDownStatus.current) {
                return;
            }
            handleDragMove?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY,
            });
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (!mouseDownStatus.current) {
                return;
            }
            handleDragEnd?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY,
            });
            resetSelect();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("blur", handleMouseCancel);
        };

        const handleMouseCancel = () => {
            if (!mouseDownStatus.current) {
                return;
            }
            resetSelect();
            handleDragCancel?.();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("blur", handleMouseCancel);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                ref={ref}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                onMouseDown={handleMouseDown}
                {...props}
            />
        );
    },
);
Temp.displayName = "DragBar";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
