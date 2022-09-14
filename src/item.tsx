/**
 * @file
 * @date 2022-09-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import cloud1 from "./Image/btn_left.png";
import cloud2 from "./Image/btn_right.png";
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

    const state = useRef<string>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const draw = () => {
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

            state.current = `{width:${width},height:${height}}`;

            const ctx = el.getContext("2d");
            if (!ctx) {
                return;
            }
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            const outStokeColor = ctx.createLinearGradient(width / 2, 0, width / 2, height);
            outStokeColor.addColorStop(0, "#E6DF39");
            outStokeColor.addColorStop(1, "rgba(246,242,128,0.78)");

            ctx.strokeStyle = outStokeColor;

            const outFillColor = ctx.createLinearGradient(width / 2, 0, width / 2, height);
            outFillColor.addColorStop(0, "#FEB662");
            outFillColor.addColorStop(1, "#D93504");
            ctx.fillStyle = outFillColor;
            drawRect(ctx, 0.6, 0.6, width - 0.6, height - 0.6);

            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            const innerStokeColor = ctx.createLinearGradient(9, height - 2, width - 11.5, 2);
            innerStokeColor.addColorStop(0, "#852C10");
            innerStokeColor.addColorStop(0.8, "rgba(255,245,0,0.77)");

            ctx.strokeStyle = innerStokeColor;

            const innerFillColor = ctx.createLinearGradient(width / 2, height - 4, width / 2, 4);
            innerFillColor.addColorStop(0, "#FBF4D7");
            innerFillColor.addColorStop(1, "#ECCE8E");
            ctx.fillStyle = innerFillColor;
            drawRect(ctx, 4, 4, width - 4, height - 4);

            ctx.stroke();
            ctx.fill();
        };

        const fn = () => {
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
            const str = `{width:${width},height:${height}}`;
            if (str !== state.current) {
                draw();
            }
        };
        draw();
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <canvas ref={ref} className="itemBg" />
            <img src={cloud1} alt="" className="itemBg_left" />
            <img src={cloud2} alt="" className="itemBg_right" />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
