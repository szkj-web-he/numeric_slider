/**
 * @file
 * @date 2022-08-25
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useGroupEl } from "./Unit/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
    ({ className, children, index, ...props }, ref) => {
        Group.displayName = "Group";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const id = useGroupEl();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={id + (className ? ` ${className}` : "")}
                ref={(el) => {
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                data-index={index}
                {...props}
            >
                {children}
            </div>
        );
    },
);
Group.displayName = "Group";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
