/**
 * @file 三角形
 * @date 2022-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import activeBtn from "../../../Image/btn_active.png";
import btn from "../../../Image/btn_gray.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;

    placement: "top" | "bottom";
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ active = false, placement, className, ...props }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={`jumpBtn_${placement}${active ? " active" : ""}${
                className ? ` ${className}` : ""
            }`}
            {...props}
        >
            <img src={btn} alt="" className="jumpBtn_btnIcon" />
            <img src={activeBtn} alt="" className="jumpBtn_activeIcon" />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
