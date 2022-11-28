/**
 * @file
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import RatedOption from "./ratedOption";
import { OptionProps, ScoreOption, ScoreRange } from "./type";
import { deepCloneData } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    scoreOptions: Array<ScoreOption>;

    scoreRange?: ScoreRange[];

    staticScoreOptions: ScoreOption[];

    /**
     *当分数发生变化的时候
     */
    onChange: (res: ScoreOption[]) => void;

    selectOption?: OptionProps;

    setSelectOption: (res?: OptionProps) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    scoreOptions,
    scoreRange,
    onChange,
    selectOption,
    staticScoreOptions,
    setSelectOption,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);

    const [height, setHeight] = useState<number>();

    const dragEl = useRef<Record<string, HTMLDivElement | null>>({});

    const selectOptionRef = useRef(deepCloneData(selectOption));

    const rangeRef = useRef(deepCloneData(scoreRange));

    const changeFn = useRef(onChange);
    const scoreOptionsRef = useRef(deepCloneData(scoreOptions));
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useLayoutEffect(() => {
        scoreOptionsRef.current = deepCloneData(scoreOptions);
    }, [scoreOptions]);
    useLayoutEffect(() => {
        selectOptionRef.current = deepCloneData(selectOption);
    }, [selectOption]);
    useLayoutEffect(() => {
        changeFn.current = onChange;
    }, [onChange]);

    useLayoutEffect(() => {
        rangeRef.current = deepCloneData(scoreRange);
    }, [scoreRange]);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }
        let timer: null | number = null;

        const fn = () => {
            const els = node.querySelectorAll(".ratedOption_items");
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
            if (!rangeRef.current) {
                return;
            }

            let scoreVal = 0;
            for (let i = 0; i < scoreOptionsRef.current.length; ) {
                const item = scoreOptionsRef.current[i];
                if (item.code === selectOptionRef.current.code) {
                    i = scoreOptionsRef.current.length;
                    scoreVal = item.value;
                } else {
                    ++i;
                }
            }

            let n = -1;
            for (let i = 0; i < rangeRef.current.length; ) {
                if (
                    scoreVal >= rangeRef.current[i].value &&
                    (rangeRef.current?.[i + 1]?.value
                        ? scoreVal < rangeRef.current[i + 1].value
                        : true)
                ) {
                    n = i;
                    i = rangeRef.current.length;
                } else {
                    ++i;
                }
            }
            if (rangeRef.current[n + status]) {
                for (let i = 0; i < staticScoreOptions.length; i++) {
                    const option = staticScoreOptions[i];
                    if (option.code === selectOptionRef.current.code) {
                        option.value = rangeRef.current[n + status].value;
                    }
                }
                changeFn.current(deepCloneData(staticScoreOptions));
            }
        };

        const mainKeyDownFn = (e: KeyboardEvent) => {
            const code = e.key;
            if (!selectOptionRef.current) {
                return;
            }

            if (!["ArrowRight", "ArrowLeft"].includes(code)) {
                return;
            }
            e.preventDefault();
            if (code === "ArrowRight") {
                fn(1);
            } else {
                fn(-1);
            }
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
            fn(status);
        };

        document.addEventListener("keydown", mainKeyDownFn);
        const optionAttr = { passive: false };
        document.addEventListener("wheel", mainWheelFn, optionAttr);
        return () => {
            document.removeEventListener("keydown", mainKeyDownFn);
            document.removeEventListener("wheel", mainWheelFn, optionAttr);
        };
    }, [staticScoreOptions]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const changeItemValue = (item: OptionProps, score: number) => {
        for (let i = 0; i < staticScoreOptions.length; i++) {
            const option = staticScoreOptions[i];
            if (option.code === item.code) {
                option.value = score;
            }
        }
        onChange(deepCloneData(staticScoreOptions));
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!selectOption || !scoreRange) {
            return;
        }

        const el = e.currentTarget;
        const { left } = el.getBoundingClientRect();
        const { clientX } = e;
        const x = clientX - left;

        let score = 0;
        for (let i = 0; i < scoreRange.length; ) {
            const item = scoreRange[i];
            if (item.min <= x && item.max > x) {
                i = scoreRange.length;
                score = item.value;
            } else {
                ++i;
            }
        }

        changeItemValue(selectOption, score);
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
            <div className={`dragHotspot`} ref={ref}>
                <div
                    className={`sliderTrunk${scoreOptions.length ? " active" : ""}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClick}
                />

                {scoreOptions.map((item, n) => {
                    return (
                        <RatedOption
                            key={`${item.code}`}
                            content={item.content}
                            scoreValue={item.value}
                            parent={ref.current}
                            getEl={(el) => {
                                dragEl.current[item.code] = el;
                            }}
                            sibling={dragEl.current}
                            elder={deepCloneData(scoreOptions).slice(0, n)}
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
                            handleScoreChange={(score) => {
                                changeItemValue(item, score);
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
