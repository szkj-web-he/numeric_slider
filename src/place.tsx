/**
 * @file 选项的放置地
 * @date 2022-08-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { comms } from ".";
import { ScaleProps, setScale } from "./unit";
import { useScaleMarginVal } from "./useScaleMarginVal";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    children: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ children }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [scaleData, setScaleData] = useState<ScaleProps[]>();

    const scaleDataRef = useRef<string>();

    const { setValue } = useScaleMarginVal();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            const data = setScale();
            if (data && scaleDataRef.current !== JSON.stringify(data)) {
                setScaleData([...data.scale]);
                setValue(data.margin);
                scaleDataRef.current = JSON.stringify(data.scale);
            }
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, [setValue]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    {
        const data = setScale();
        if (data && scaleDataRef.current !== JSON.stringify(data.scale)) {
            setScaleData([...data.scale]);
            setValue(data.margin);
            scaleDataRef.current = JSON.stringify(data.scale);
        }
    }

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="place">
            <div className="placeTips">{comms.config.optionsInstruction}</div>
            <div className="rulerContainer">
                <div className="ruler">
                    {scaleData?.map((item) => {
                        if (item.status === 1) {
                            return (
                                <div
                                    className="scaleItem_middle"
                                    key={`scale${item.value}`}
                                    style={{
                                        left: `${item.left}px`,
                                    }}
                                />
                            );
                        } else if (item.status === 2) {
                            return (
                                <div
                                    className="scaleItem_big"
                                    key={`scale${item.value}`}
                                    style={{
                                        left: `${item.left}px`,
                                    }}
                                >
                                    <div className="scaleItem_icon" />
                                    <div className="scaleItemValue">{item.value}</div>
                                </div>
                            );
                        }
                        return (
                            <div
                                className="scaleItem"
                                key={`scale${item.value}`}
                                style={{
                                    left: `${item.left}px`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            {children}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
