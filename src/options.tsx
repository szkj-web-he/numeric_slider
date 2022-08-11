/**
 * @file 需要评分的选项
 * @date 2022-08-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { comms } from ".";
import { Drag } from "./Drag";
import { ScrollComponent } from "./Scroll";
import { useMobileStatus } from "./isMobileContext";
import { DragMoveProps } from "./type";
import { useState } from "react";
import { OptionProps } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    handleDragStart?: (res: OptionProps) => void;

    handleDragMove?: (res: DragMoveProps) => void;

    handleDragEnd?: (res: OptionProps) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleDragStart, handleDragMove, handleDragEnd }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const isMobile = useMobileStatus();

    const [stopDrag, setStopDrag] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const content = (
        <div className="options_items">
            {comms.config.options?.map((item) => {
                return (
                    <Drag
                        className={"item"}
                        portalClassName={stopDrag ? "stop" : ""}
                        activeClassName="gray"
                        key={item.code}
                        handleDragStart={() => {
                            setStopDrag(false);
                            handleDragStart?.({
                                ...item,
                            });
                        }}
                        handleDragMove={(res) => {
                            setStopDrag(!!res.name);
                            handleDragMove?.(res);
                        }}
                        handleDragEnd={() => {
                            setStopDrag(false);
                            handleDragEnd?.({ ...item });
                        }}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                        />
                    </Drag>
                );
            })}
        </div>
    );

    return (
        <div className="options">
            <div className="options_total">
                共 <span className="options_totalVal">{comms.config.options?.length ?? 0}</span>项
            </div>
            {isMobile ? (
                <div className="options_mobileScroll">{content}</div>
            ) : (
                <ScrollComponent hidden={{ x: true }} bodyClassName="options_scrollBody">
                    {content}
                </ScrollComponent>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
