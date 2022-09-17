/**
 * @file
 * @date 2022-09-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import activeIcon from "./Image/hr1.png";
import icon from "./Image/hr2.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);

    const [num, setNum] = useState(0);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            const node = ref.current;
            if (!node) {
                return;
            }
            const width = node.offsetWidth;
            setNum(Math.floor(width / 15));
        };
        let timer: number | null = null;
        const main = () => {
            timer = window.setTimeout(fn);
        };
        fn();
        window.addEventListener("resize", main);
        return () => {
            window.removeEventListener("resize", main);
            timer && window.clearTimeout(timer);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="hr">
            <div className="hr_left">
                {new Array(3).fill("").map((_, index) => {
                    return <img src={activeIcon} alt="" key={index} className="hr_active" />;
                })}
            </div>
            <div className="hr_center" ref={ref}>
                {new Array(num).fill("").map((_, index) => {
                    return <img src={icon} alt="" key={index} className="hr_none" />;
                })}
            </div>
            <div className="hr_right">
                {new Array(3).fill("").map((_, index) => {
                    return <img src={activeIcon} alt="" key={index} className="hr_active" />;
                })}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
