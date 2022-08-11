/**
 * @file
 * @date 2022-08-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import DragHotspot from "./dragHotspot";
import Options from "./options";
import Place from "./place";
import { DragMoveProps, OptionProps } from "./type";
import { ScaleMargin } from "./useScaleMarginVal";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [dragStatus, setDragStatus] = useState(false);

    const [left, setLeft] = useState<number>();

    const [option, setOption] = useState<OptionProps>();

    const [id, setId] = useState<string>();

    const [margin, setMargin] = useState(1);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleDragStart = (res: OptionProps) => {
        setDragStatus(true);
        setLeft(undefined);
        setOption({ ...res });
    };

    const handleDragMove = (res: DragMoveProps) => {
        setId(res.name);
        if (res.name) {
            setLeft(res.clientX);
        } else {
            setLeft(undefined);
        }
    };

    const handleDragEnd = () => {
        setDragStatus(false);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="main">
            <Options
                handleDragStart={handleDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
            />
            <div className="hr" />
            <ScaleMargin.Provider
                value={{
                    value: margin,
                    setValue: setMargin,
                }}
            >
                <Place>
                    <DragHotspot
                        active={dragStatus}
                        clientX={left}
                        option={option}
                        currentId={id}
                    />
                </Place>
            </ScaleMargin.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
