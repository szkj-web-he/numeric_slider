/**
 * @file
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useId, useRef, useState } from "react";
import { DragBox } from "./DragBox";
import RatedOption from "./ratedOption";
import { OptionProps } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    active: boolean;

    clientX?: number;

    option?: OptionProps;

    currentId?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ active, clientX, option, currentId }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const id = useId();

    const ref = useRef<HTMLDivElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    console.log(active, "active");
    console.log(clientX, "clientX");
    console.log(option, "option");

    // useEffect(() => {
    //     const node = ref.current;
    //     if (!node) {
    //         return;
    //     }

    //     const width = node.offsetWidth;

    //     if (active && typeof left === "number" && option) {
    //         let val = left;
    //         if (val < 0) {
    //             val = 0;
    //         } else if (val > width) {
    //             val = width;
    //         }

    //         setActiveOption({
    //             code: option.code,
    //             content: option.content,
    //             left: val,
    //         });
    //     }
    // }, [left, active, option]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <DragBox id={id} className={`dragHotspot${active ? ` active` : ""}`}>
            <div className="sliderTrunk" ref={ref}>
                <RatedOption
                    options={[
                        {
                            code: "1",
                            content: "21321321321",
                        },
                    ]}
                    clientX={10}
                    parent={ref.current}
                />
                {!!(active && typeof clientX === "number" && option && currentId === id) && (
                    <RatedOption options={[option]} clientX={clientX} parent={ref.current} />
                )}
            </div>
        </DragBox>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
