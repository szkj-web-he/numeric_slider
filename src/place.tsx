/**
 * @file 选项的放置地
 * @date 2022-08-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { comms } from ".";
import DragHotspot from "./dragHotspot";
import Ruler from "./ruler";
import { OptionProps, ScoreRange } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    scoreOptions: OptionProps[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ scoreOptions }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [scoreRange, setScoreRange] = useState<ScoreRange[]>([]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="place">
            <div className="placeTips">{comms.config.optionsInstruction}</div>
            <Ruler setScaleRange={setScoreRange} />
            <DragHotspot scoreRange={scoreRange} scoreOptions={scoreOptions} />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
