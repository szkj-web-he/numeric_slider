/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { comms } from ".";
import DragHotspot from "./dragHotspot";
import Options from "./options";
import Ruler from "./ruler";
import { OptionProps, ScoreOption } from "./type";
import { useRuler } from "./useRuler";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { deepCloneData } from "./unit";
import { useEffect } from "react";
import Hr from "./hr";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [scoreOptions, setScoreOptions] = useState<Array<ScoreOption>>([]);

    const rulerData = useRuler();

    const [selectOption, setSelectOption] = useState<OptionProps>();

    const scoreOptionsRef = useRef<Array<ScoreOption>>([]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const data: Record<string, number | null> = {};
        const arr = comms.config.options ?? [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const option = scoreOptions.find((option) => option.code === item.code);

            data[item.code] = option?.value ?? null;
        }
        comms.state = data;
    }, [scoreOptions]);

    useLayoutEffect(() => {
        scoreOptionsRef.current = deepCloneData(scoreOptions);
    }, [scoreOptions]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="main">
            <Options
                setList={setScoreOptions}
                setSelectOption={setSelectOption}
                list={scoreOptions}
            />
            <Hr />
            <div className="place">
                <div className="placeTips">{comms.config.optionsInstruction}</div>
                <Ruler ruler={rulerData?.[0]} />
                <DragHotspot
                    scoreRange={rulerData?.[1]}
                    scoreOptions={scoreOptions}
                    selectOption={selectOption}
                    staticScoreOptions={scoreOptionsRef}
                    setSelectOption={setSelectOption}
                    onChange={(res) => {
                        setScoreOptions(deepCloneData(res));
                    }}
                />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
