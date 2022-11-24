/**
 * @file
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useEffect, useRef, useState } from "react";
import RatedOption from "./ratedOption";
import { OptionProps, ScoreOption, ScoreRange } from "./type";
import { deepCloneData, transformScoreOptions } from "./unit";
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

    const [selectOption, setSelectOption] = useState<OptionProps>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        setScoreDrag((pre) => [...transformScoreOptions(scoreOptions, pre)]);
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

    /**
     * 更改分数
     */
    const handleScoreChange = (value: number, option: OptionProps) => {
        // flushSync(() => {
        setScoreDrag((pre) => {
            let n = -1;

            //这里删除
            for (let i = 0; i < pre.length; ) {
                const item = pre[i];
                for (let j = 0; j < item.options.length; ) {
                    const data = item.options[j];
                    if (data.code === option.code) {
                        n = j;
                        j = item.options.length;
                    } else {
                        ++j;
                    }
                }

                if (n >= 0) {
                    item.options.splice(n, 1);
                    i = pre.length;
                } else {
                    ++i;
                }
            }

            n = -1;
            //这里添加
            for (let i = 0; i < pre.length; ) {
                const item = pre[i];
                if (item.score === value) {
                    n = i;
                    i = pre.length;
                } else {
                    ++i;
                }
            }

            if (n >= 0) {
                pre[n].options.push(deepCloneData(option));
            } else {
                pre.push({
                    score: value,
                    options: [deepCloneData(option)],
                });
            }
            return [...pre];
        });
        // });
    };

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
                        return item.options.length ? (
                            <RatedOption
                                key={`${item.score}${n}`}
                                range={scoreRange}
                                options={item.options}
                                parent={ref.current}
                                scoreValue={item.score}
                                selectOption={selectOption}
                                handleFocusOption={(res) => setSelectOption(res)}
                                handleScoreChange={handleScoreChange}
                            />
                        ) : (
                            <Fragment key={`${item.score}${n}`} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
