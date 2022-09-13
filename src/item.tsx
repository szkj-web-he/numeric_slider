/**
 * @file
 * @date 2022-09-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import { useEffect } from "react";
import { drawRect } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLCanvasElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        const parent = el.parentElement;
        if (!parent) {
            return;
        }
        const width = parent.offsetWidth;
        const height = parent.offsetHeight;

        el.width = width;
        el.height = height;

        const ctx = el.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.beginPath();
        const outStokeColor = ctx.createLinearGradient(width / 2, 0, width / 2, height);
        outStokeColor.addColorStop(0, "#E6DF39");
        outStokeColor.addColorStop(1, "rgba(246,242,128,0.78)");

        ctx.strokeStyle = "#000";

        const outFillColor = ctx.createLinearGradient(width / 2, 0, width / 2, height);
        outFillColor.addColorStop(0, "#FEB662");
        outFillColor.addColorStop(1, "#D93504");
        ctx.fillStyle = outFillColor;
        drawRect(ctx, 2, 2, width - 2, height - 2);

        ctx.stroke();
        ctx.fill();
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return <canvas ref={ref} className="itemBg" />;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
