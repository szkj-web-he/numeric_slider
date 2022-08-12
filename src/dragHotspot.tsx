/**
 * @file
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import RatedOption from "./ratedOption";
import { ScoreOption, ScoreRange } from "./type";
import { transformScoreOptions } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    scoreOptions: ScoreOption[];

    scoreRange: ScoreRange[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ scoreOptions, scoreRange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);

    const [height, setHeight] = useState<number>();

    const [scoreDrag, setScoreDrag] = useState(transformScoreOptions(scoreOptions));

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        setScoreDrag([...transformScoreOptions(scoreOptions)]);
    }, [scoreOptions]);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }
        let timer: null | number = null;

        const fn = () => {
            const els = document.querySelectorAll(".ratedOption_items");
            let max = 0;
            for (let i = 0; i < els.length; i++) {
                const el = els[i];
                if (el instanceof HTMLElement) {
                    max = Math.max(el.offsetHeight, max);
                }
            }
            setHeight(max);
        };

        const main = () => {
            timer && window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                fn();
                timer = null;
            }, 100);
        };

        const ob = new MutationObserver(main);

        ob.observe(node, {
            attributes: true,
            subtree: true,
        });
        return () => {
            ob.disconnect();
            timer && window.clearTimeout(timer);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className="dragHotspot_wrap"
            style={
                height
                    ? {
                          height: `${height}px`,
                      }
                    : undefined
            }
        >
            <div className={`dragHotspot`}>
                <div className="sliderTrunk" ref={ref}>
                    {scoreDrag.map((item, n) => {
                        return (
                            <RatedOption
                                key={`${item.score}${n}`}
                                range={scoreRange}
                                options={item.options}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
