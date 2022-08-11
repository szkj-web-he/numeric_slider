/**
 * @file 放置拖拽物的盒子
 * @date 2022-06-22
 * @author xuejie.he
 * @lastModify xuejie.he 2022-06-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useLayoutEffect, useRef } from "react";
import { useDragContext } from "../dragContext";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DragBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * key of this component
     */
    id: string;
    /**
     *
     */
    children?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DragBox = forwardRef<HTMLDivElement, DragBoxProps>(
    ({ id, children, ...props }, ref) => {
        DragBox.displayName = "DragBox";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const cRef = useRef<HTMLDivElement | null>(null);

        const { boxes } = useDragContext();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useLayoutEffect(() => {
            boxes.push({
                id,
                el: cRef.current,
            });
        }, [boxes, id]);

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
            >
                {children}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
DragBox.displayName = "DragBox";
