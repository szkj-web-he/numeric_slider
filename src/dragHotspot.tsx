/**
 * @file
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    useDeferredValue,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useTransition,
} from "react";
import { flushSync } from "react-dom";
import RatedOption from "./ratedOption";
import { OptionProps, ScoreRange } from "./type";
import { deepCloneData, ScoreOptions, transformScoreOptions } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    scoreOptions: OptionProps[];

    scoreRange: ScoreRange[];

    /**
     *当分数发生变化的时候
     */
    onChange: (res: ScoreOptions[]) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ scoreOptions, scoreRange, onChange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);

    const [height, setHeight] = useState<number>();

    const [scoreDrag, setScoreDrag] = useState(transformScoreOptions(scoreOptions));

    const [selectOption, setSelectOption] = useState<OptionProps | undefined>(
        scoreOptions[scoreOptions.length - 1],
    );

    const deferredScoreDrag = useDeferredValue(scoreDrag);

    const dragEl = useRef<Record<string, HTMLDivElement | null>>({});

    const selectOptionRef = useRef(deepCloneData(selectOption));

    const rangeRef = useRef(deepCloneData(scoreRange));

    const [, transitionFn] = useTransition();

    const scoreDragRef = useRef(deepCloneData(scoreDrag));

    const changeFn = useRef(onChange);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        changeFn.current = onChange;
    }, [onChange]);

    useLayoutEffect(() => {
        selectOptionRef.current = deepCloneData(selectOption);
    }, [selectOption]);

    useLayoutEffect(() => {
        scoreDragRef.current = deepCloneData(scoreDrag);
        transitionFn(() => {
            changeFn.current(scoreDragRef.current);
        });
    }, [scoreDrag]);

    useLayoutEffect(() => {
        rangeRef.current = deepCloneData(scoreRange);
    }, [scoreRange]);

    useEffect(() => {
        setSelectOption(scoreOptions[scoreOptions.length - 1]);
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
                    const transformArr = window
                        .getComputedStyle(el, null)
                        .transform.replace(/(matrix\(|\))/g, "")
                        .split(",");

                    const translateY = Number(transformArr[transformArr.length - 1]);
                    max = Math.max(el.offsetHeight + translateY, max);
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

    useEffect(() => {
        const fn = (status: 1 | -1) => {
            if (!selectOptionRef.current) {
                return;
            }
            let scoreVal = 0;
            for (let i = 0; i < scoreDragRef.current.length; ) {
                const item = scoreDragRef.current[i];
                if (item.code === selectOptionRef.current.code) {
                    i = scoreDragRef.current.length;
                    scoreVal = item.score;
                } else {
                    ++i;
                }
            }

            let n = -1;
            for (let i = 0; i < rangeRef.current.length; ) {
                if (rangeRef.current[i].value === scoreVal) {
                    n = i;
                    i = rangeRef.current.length;
                } else {
                    ++i;
                }
            }
            if (rangeRef.current[n + status]) {
                setScoreDrag((pre) => {
                    if (!selectOptionRef.current) {
                        return pre;
                    }
                    let index = -1;
                    for (let i = 0; i < pre.length; ) {
                        const item = pre[i];
                        if (item.code === selectOptionRef.current.code) {
                            index = i;
                            i = scoreDragRef.current.length;
                        } else {
                            ++i;
                        }
                    }
                    if (index >= 0) {
                        pre[index].score = rangeRef.current[n + status].value;
                        pre[index].left = rangeRef.current[n + status].x;
                    }
                    return deepCloneData(pre);
                });
            }
        };

        const mainKeyDownFn = (e: KeyboardEvent) => {
            const code = e.key;
            transitionFn(() => {
                if (!selectOptionRef.current) {
                    return;
                }

                if (!["ArrowRight", "ArrowLeft"].includes(code)) {
                    return;
                }

                if (code === "ArrowRight") {
                    fn(1);
                } else {
                    fn(-1);
                }
            });
        };

        const mainWheelFn = (e: WheelEvent) => {
            if (!selectOptionRef.current) {
                return;
            }
            let status: 1 | -1 | 0 = 0;
            if (e.deltaY > 0) {
                status = 1;
            } else if (e.deltaY < 0) {
                status = -1;
            }
            if (status === 0) {
                return;
            }

            e.preventDefault();
            transitionFn(() => {
                fn(status as 1 | -1);
            });
        };

        document.addEventListener("keydown", mainKeyDownFn);
        const optionAttr = { passive: false };
        document.addEventListener("wheel", mainWheelFn, optionAttr);
        return () => {
            document.removeEventListener("keydown", mainKeyDownFn);
            document.removeEventListener("wheel", mainWheelFn, optionAttr);
        };
    }, []);

    useEffect(() => {
        const matchOption = (option: ScoreOptions) => {
            let exactMatch = -1;
            for (let i = 0; i < rangeRef.current.length; ) {
                const item = rangeRef.current[i];
                if (item.value === option.score) {
                    i = rangeRef.current.length;
                    exactMatch = item.x;
                } else {
                    ++i;
                }
            }
            if (exactMatch >= 0) {
                option.left = exactMatch;
                return;
            }

            let rangeVal = {
                score: 0,
                left: 0,
            };
            for (let i = 0; i < rangeRef.current.length; ) {
                const item = rangeRef.current[i];
                if (item.value <= option.score && rangeRef.current?.[i + 1].value > option.score) {
                    i = rangeRef.current.length;
                    rangeVal = {
                        left: item.x,
                        score: item.value,
                    };
                } else {
                    ++i;
                }
            }
            option.left = rangeVal.left;
            option.score = rangeVal.score;
        };

        const fn = () => {
            setScoreDrag((pre) => {
                for (let i = 0; i < pre.length; i++) {
                    matchOption(pre[i]);
                }
                return deepCloneData(pre);
            });
        };

        let timer: null | number = null;
        const main = () => {
            timer = window.setTimeout(fn, 100);
        };

        window.addEventListener("resize", main);
        return () => {
            window.addEventListener("resize", main);
            timer && window.clearTimeout(timer);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!selectOption) {
            return;
        }

        const el = e.currentTarget;
        const { left } = el.getBoundingClientRect();
        const { clientX } = e;
        transitionFn(() => {
            const x = clientX - left;

            let spot = {
                x: 0,
                score: 0,
            };
            for (let i = 0; i < scoreRange.length; ) {
                const item = scoreRange[i];
                if (item.min <= x && item.max > x) {
                    i = scoreRange.length;
                    spot = {
                        x: item.x,
                        score: item.value,
                    };
                } else {
                    ++i;
                }
            }

            setScoreDrag((pre) => {
                for (let i = 0; i < pre.length; ) {
                    if (pre[i].code === selectOption.code) {
                        pre[i].left = spot.x;
                        pre[i].score = spot.score;

                        i = pre.length;
                    } else {
                        ++i;
                    }
                }
                return deepCloneData(pre);
            });
        });
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
                <div
                    className="sliderTrunk"
                    ref={ref}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClick}
                />

                {deferredScoreDrag.map((item, n) => {
                    return (
                        <RatedOption
                            key={`${item.code}`}
                            dragOption={item}
                            parent={ref.current}
                            scoreValue={item.score}
                            getEl={(el) => {
                                dragEl.current[item.code] = el;
                            }}
                            sibling={dragEl.current}
                            elder={deepCloneData(deferredScoreDrag).slice(0, n)}
                            handleFocused={(res) => {
                                if (res) {
                                    setSelectOption({
                                        code: item.code,
                                        content: item.content,
                                    });
                                } else {
                                    setSelectOption(undefined);
                                }
                            }}
                            active={item.code === selectOption?.code}
                            range={scoreRange}
                            handleScoreChange={(score, left) => {
                                flushSync(() => {
                                    setScoreDrag((pre) => {
                                        let n = -1;
                                        for (let i = 0; i < scoreDrag.length; ) {
                                            if (scoreDrag[i].code === item.code) {
                                                n = i;
                                                i = scoreDrag.length;
                                            } else {
                                                ++i;
                                            }
                                        }

                                        pre[n].score = score;
                                        pre[n].left = left;
                                        return deepCloneData(pre);
                                    });
                                });
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
