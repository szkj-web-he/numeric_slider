/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { comms } from ".";
import DragHotspot from "./dragHotspot";
import Hr from "./hr";
import Options from "./options";
import Ruler from "./ruler";
import { OptionProps, ScoreOption } from "./type";
import { deepCloneData } from "./unit";
import { useRuler } from "./useRuler";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [scoreOptions, setScoreOptions] = useState<Array<ScoreOption>>();

    const rulerData = useRuler();

    const [selectOption, setSelectOption] = useState<OptionProps>();

    const scoreOptionsRef = useRef<Array<ScoreOption>>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const data: Record<string, number | null> = {};
        const cols = comms.config.options ?? [];

        for (let j = 0; j < cols.length; j++) {
            const col = cols[j];
            const valData = scoreOptions?.find((item) => item.code === col.code);
            data[col.code] = valData?.value ?? null;
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
                setList={(res) => {
                    scoreOptionsRef.current = deepCloneData(res);
                    setScoreOptions(deepCloneData(scoreOptionsRef.current));
                }}
                setSelectOption={(res) => {
                    setSelectOption(deepCloneData(res));
                }}
                list={scoreOptions ?? []}
            />
            <Hr />
            <div className="place">
                <div className="placeTips">{comms.config.optionsInstruction}</div>
                <Ruler ruler={rulerData?.[0]} />
                <DragHotspot
                    scoreRange={rulerData?.[1]}
                    scoreOptions={scoreOptions ?? []}
                    selectOption={selectOption}
                    staticScoreOptions={deepCloneData(scoreOptionsRef.current ?? [])}
                    setSelectOption={(res) => {
                        if (res) {
                            setSelectOption(deepCloneData(res));
                        } else {
                            setSelectOption(undefined);
                        }
                    }}
                    onChange={(res) => {
                        scoreOptionsRef.current = deepCloneData(res);
                        setScoreOptions(deepCloneData(scoreOptionsRef.current));
                    }}
                >
                    {rulerData?.[0]
                        .filter((rule) => {
                            return rule.status === 2 || rule.status === 1.5;
                        })
                        .map((rule, n) => {
                            if (n === 0 || n === rulerData?.[0].length - 1) {
                                return <Fragment key={rule.left} />;
                            }
                            return (
                                <div
                                    className="placeBlank"
                                    key={rule.left}
                                    style={{
                                        left: `${rule.left}px`,
                                    }}
                                />
                            );
                        })}
                </DragHotspot>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
