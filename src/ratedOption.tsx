/**
 * @file 要被评价的选项
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Drag } from "./Drag";
import Icon from "./icon";
import { DragMoveProps, DragPramsProps, OptionProps, ScoreRange } from "./type";
import { useHashId } from "./useHashId";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    options: Array<OptionProps>;

    range: ScoreRange[];

    parent: HTMLDivElement | null;

    handleScoreChange: (res: number, option: OptionProps) => void;

    scoreValue: number;

    handleFocusOption: (option?: OptionProps) => void;

    selectOption?: OptionProps;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    options,
    range,
    parent,
    handleScoreChange,
    scoreValue,
    handleFocusOption,
    selectOption,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const ref = useRef<HTMLDivElement | null>(null);

    const [left, setLeft] = useState(() => {
        let leftVal = 0;
        for (let i = 0; i < range.length; ) {
            const item = range[i];

            if (item.value === scoreValue) {
                i = range.length;
                leftVal = item.x;
            } else {
                ++i;
            }
        }
        return leftVal;
    });

    const id = useHashId("scoreOptions_");

    const offsetX = useRef(0);

    const activeRef = useRef<HTMLDivElement | null>(null);

    const scoreChangeFn = useRef(handleScoreChange);
    const rangeRef = useRef(range);
    const scoreValueRef = useRef(scoreValue);
    const selectOptionRef = useRef(selectOption);
    const optionsRef = useRef(options);

    const leftRef = useRef(left);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        leftRef.current = left;
    }, [left]);

    useLayoutEffect(() => {
        optionsRef.current = options;
    }, [options]);
    useLayoutEffect(() => {
        scoreChangeFn.current = handleScoreChange;
    }, [handleScoreChange]);
    useLayoutEffect(() => {
        rangeRef.current = range;
    }, [range]);
    useLayoutEffect(() => {
        scoreValueRef.current = scoreValue;
    }, [scoreValue]);
    useLayoutEffect(() => {
        selectOptionRef.current = selectOption;
    }, [selectOption]);

    useLayoutEffect(() => {
        let style: HTMLStyleElement | null = null;

        const fn = () => {
            style?.remove();
            node?.classList.remove(id);

            const body = ref.current;
            if (!body) {
                return;
            }

            let el: HTMLElement | null = null;
            for (let i = 0; i < body.children.length; ) {
                const item = body.children[i];
                if (item instanceof HTMLElement) {
                    el = item;
                    i = body.children.length;
                } else {
                    ++i;
                }
            }

            const parent = body.parentElement;
            if (!el) {
                return;
            }
            if (!parent) {
                return;
            }

            const rect = el.getBoundingClientRect();

            let val = rect.left - rect.width / 2;

            if (rect.left - rect.width / 2 < 5) {
                val = 5;
            } else if (rect.left + rect.width > document.body.offsetWidth - 5) {
                val = document.body.offsetWidth - 5 - rect.width;
            }

            const pLeft = parent.getBoundingClientRect().left;

            const x = val - pLeft;

            style = document.createElement("style");
            style.innerHTML = `.${id}{
            transform:translateX(${x}px)
          }`;
            body.classList.add(id);
            document.body.append(style);
        };

        fn();
        window.addEventListener("resize", fn);

        const node = ref.current;
        return () => {
            window.removeEventListener("resize", fn);
            style?.remove();
            node?.classList.remove(id);
        };
    }, [options, id, left]);

    useLayoutEffect(() => {
        setLeft(() => {
            let leftVal = 0;
            for (let i = 0; i < rangeRef.current.length; ) {
                const item = rangeRef.current[i];

                if (item.value === scoreValue) {
                    i = rangeRef.current.length;
                    leftVal = item.x;
                } else {
                    ++i;
                }
            }
            return leftVal;
        });
    }, [scoreValue]);

    useEffect(() => {
        const fn = () => {
            let exactMatch = -1;
            for (let i = 0; i < rangeRef.current.length; ) {
                const item = rangeRef.current[i];
                if (item.value === scoreValueRef.current) {
                    i = rangeRef.current.length;
                    exactMatch = item.x;
                } else {
                    ++i;
                }
            }
            if (exactMatch >= 0) {
                setLeft(exactMatch);
                return;
            }

            let rangeVal = {
                score: 0,
                left: 0,
            };
            for (let i = 0; i < rangeRef.current.length; ) {
                const item = rangeRef.current[i];
                if (
                    item.value <= scoreValueRef.current &&
                    rangeRef.current?.[i + 1].value > scoreValueRef.current
                ) {
                    i = rangeRef.current.length;
                    rangeVal = {
                        left: item.x,
                        score: item.value,
                    };
                } else {
                    ++i;
                }
            }
            setLeft(rangeVal.left);
            for (let i = 0; i < optionsRef.current.length; i++) {
                scoreChangeFn.current(rangeVal.score, optionsRef.current[i]);
            }
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    useEffect(() => {
        const el = activeRef.current;
        if (!el) {
            return;
        }
        if (document.activeElement !== el) {
            el.focus();
        }
    }, [options, left]);

    useEffect(() => {
        return () => {
            activeRef.current = null;
        };
    }, [options]);

    useLayoutEffect(() => {
        const keyDownFn = (status: 1 | -1) => {
            if (!selectOptionRef.current) {
                return;
            }
            let n = -1;
            for (let i = 0; i < rangeRef.current.length; ) {
                if (rangeRef.current[i].value === scoreValueRef.current) {
                    n = i;
                    i = rangeRef.current.length;
                } else {
                    ++i;
                }
            }
            if (rangeRef.current[n + status]) {
                scoreChangeFn.current(rangeRef.current[n + status].value, selectOptionRef.current);
            }
        };

        const mainKeyDownFn = (e: KeyboardEvent) => {
            const code = e.key;
            if (!selectOptionRef.current) {
                return;
            }
            let status = false;
            for (let i = 0; i < optionsRef.current.length; ) {
                const item = optionsRef.current[i];
                if (item.code === selectOptionRef.current.code) {
                    status = true;
                    i = optionsRef.current.length;
                } else {
                    ++i;
                }
            }
            if (!status) {
                return;
            }

            if (!["ArrowRight", "ArrowLeft"].includes(code)) {
                return;
            }

            if (code === "ArrowRight") {
                keyDownFn(1);
            } else {
                keyDownFn(-1);
            }
        };

        document.addEventListener("keydown", mainKeyDownFn);
        return () => {
            document.removeEventListener("keydown", mainKeyDownFn);
        };
    }, []);

    useLayoutEffect(() => {
        const wheelFn = (status: 1 | -1) => {
            if (!selectOptionRef.current) {
                return;
            }
            let n = -1;
            for (let i = 0; i < rangeRef.current.length; ) {
                if (rangeRef.current[i].value === scoreValueRef.current) {
                    n = i;
                    i = rangeRef.current.length;
                } else {
                    ++i;
                }
            }
            if (rangeRef.current[n + status]) {
                scoreChangeFn.current(rangeRef.current[n + status].value, selectOptionRef.current);
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

            let flag = false;
            for (let i = 0; i < optionsRef.current.length; ) {
                const item = optionsRef.current[i];
                if (item.code === selectOptionRef.current.code) {
                    flag = true;
                    i = optionsRef.current.length;
                } else {
                    ++i;
                }
            }
            if (!flag) {
                return;
            }

            e.preventDefault();
            /**
             * 防抖滚动
             */
            wheelFn(status);
        };

        const optionAttr = { passive: false };
        document.addEventListener("wheel", mainWheelFn, optionAttr);
        return () => {
            document.removeEventListener("wheel", mainWheelFn, optionAttr);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const onFocus = (option: OptionProps) => {
        handleFocusOption(option);
    };
    const onBlur = () => {
        handleFocusOption();
    };

    const handleDragStart = (res: DragPramsProps) => {
        const el = ref.current?.parentElement;
        if (!el) {
            return;
        }
        const rect = el.getBoundingClientRect();
        offsetX.current = res.clientX - rect.left;
    };

    const handleDragMove = (res: DragMoveProps, option: OptionProps) => {
        if (!parent) {
            return;
        }
        const rect = parent.getBoundingClientRect();

        const left = res.clientX - offsetX.current - rect.left;
        let score = 0;
        for (let i = 0; i < range.length; ) {
            const item = range[i];

            if (item.min <= left && item.max > left) {
                i = range.length;
                score = item.value;
            } else {
                ++i;
            }
        }
        handleScoreChange(score, option);
    };

    const handleDragEnd = () => {
        offsetX.current = 0;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const _style: React.CSSProperties = {
        transform: `translateX(${left}px)`,
    };
    if (options.some((item) => item.code === selectOption?.code)) {
        _style.zIndex = 99;
    }
    return (
        <div className="ratedOption_items" style={_style}>
            <div className="ratedOption_score">{scoreValue}分</div>
            <Icon className="ratedOption_icon" />
            <div className="ratedOption_itemsContainer" ref={ref}>
                {options.map((option) => {
                    return (
                        <Drag
                            key={option.code}
                            className="ratedOption_item"
                            activeClassName="active"
                            handleDragEnd={() => {
                                handleDragEnd?.();
                            }}
                            handleDragStart={(res) => {
                                handleDragStart?.(res);
                            }}
                            handleDragMove={(res) => {
                                handleDragMove?.(res, option);
                            }}
                            onFocus={() => onFocus(option)}
                            onBlur={onBlur}
                            ref={(el) => {
                                if (option.code === selectOption?.code) {
                                    activeRef.current = el;
                                }
                            }}
                        >
                            <span
                                className="ratedOption_container"
                                dangerouslySetInnerHTML={{
                                    __html: option.content,
                                }}
                            />
                        </Drag>
                    );
                })}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
