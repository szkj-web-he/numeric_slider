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
import { Group } from "./Component/Group";
import Hr from "./hr";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [scoreOptions, setScoreOptions] = useState<Record<string, Array<ScoreOption>>>();

    const rulerData = useRuler();

    const [selectOption, setSelectOption] = useState<{
        row: OptionProps;
        col: OptionProps;
    }>();

    const scoreOptionsRef = useRef<Record<string, Array<ScoreOption>>>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const data: Record<string, Record<string, number | null>> = {};
        const rows = comms.config.options?.[0] ?? [];
        const cols = comms.config.options?.[1] ?? [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const selectOptions = scoreOptions?.[row.code] ?? [];
            const colData: Record<string, number | null> = {};

            for (let j = 0; j < cols.length; j++) {
                const col = cols[j];
                const valData = selectOptions.find((item) => item.code === col.code);
                colData[col.code] = valData?.value ?? null;
            }
            data[row.code] = colData;
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
            {comms.config.options?.[0].map((item, n) => {
                return (
                    <Group key={item.code} index={n}>
                        <div
                            className="group_top"
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                        />
                        <Options
                            setList={(res) => {
                                scoreOptionsRef.current = Object.assign(
                                    {},
                                    scoreOptionsRef.current,
                                    { [item.code]: deepCloneData(res) },
                                );
                                setScoreOptions(deepCloneData(scoreOptionsRef.current));
                            }}
                            setSelectOption={(res) => {
                                setSelectOption(
                                    res
                                        ? {
                                              row: deepCloneData(item),
                                              col: deepCloneData(res),
                                          }
                                        : undefined,
                                );
                            }}
                            list={scoreOptions?.[item.code] ?? []}
                        />
                        <Hr />
                        <div className="place">
                            <div className="placeTips">{comms.config.optionsInstruction}</div>
                            <Ruler ruler={rulerData?.[0]} />
                            <DragHotspot
                                scoreRange={rulerData?.[1]}
                                scoreOptions={scoreOptions?.[item.code] ?? []}
                                selectOption={
                                    selectOption?.row.code === item.code
                                        ? selectOption.col
                                        : undefined
                                }
                                staticScoreOptions={deepCloneData(
                                    scoreOptionsRef.current?.[item.code] ?? [],
                                )}
                                setSelectOption={(res) => {
                                    if (res) {
                                        setSelectOption({
                                            row: deepCloneData(item),
                                            col: deepCloneData(res),
                                        });
                                    } else {
                                        setSelectOption(undefined);
                                    }
                                }}
                                onChange={(res) => {
                                    scoreOptionsRef.current = Object.assign(
                                        {},
                                        scoreOptionsRef.current,
                                        { [item.code]: deepCloneData(res) },
                                    );
                                    setScoreOptions(deepCloneData(scoreOptionsRef.current));
                                }}
                            >
                                {rulerData?.[0]
                                    .filter((rule) => {
                                        return rule.status === 2 || rule.status === 1.5;
                                    })
                                    .map((rule) => {
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
                    </Group>
                );
            })}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
