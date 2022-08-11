/**
 * @file 要被评价的选项
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { Drag } from "./Drag";
import Icon from "./icon";
import { OptionProps } from "./type";
import { useEffect } from "react";
import { useScaleMarginVal } from "./useScaleMarginVal";
import { useRef } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    options: Array<OptionProps>;

    clientX: number;

    parent: HTMLDivElement | null;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ options, clientX, parent }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { value } = useScaleMarginVal();

    const ref = useRef<HTMLDivElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {}, [clientX, parent, value]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div
            className="ratedOption_items"
            ref={ref}
            // style={{
            //     left: `${}px`,
            // }}
        >
            <Icon className="ratedOption_icon" />
            <div
                className="ratedOption_itemsContainer"
                ref={(el) => {
                    if (!el) {
                        return;
                    }

                    const pEl = ref.current;
                    if (!pEl) {
                        return;
                    }
                    if (pEl) {
                    }

                    // if(width)
                }}
            >
                {options.map((option) => {
                    return (
                        <Drag activeClassName="gray" key={option.code} className="ratedOption_item">
                            <span
                                className="ratedOption_container"
                                dangerouslySetInnerHTML={{
                                    __html: option.content,
                                }}
                            />
                        </Drag>
                    );
                })}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
