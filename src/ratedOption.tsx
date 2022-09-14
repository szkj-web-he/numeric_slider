/**
 * @file 要被评价的选项
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Drag from "./Drag";
import Icon from "./icon";
import { Point, ScoreOption, ScoreRange } from "./type";
import { getScrollValue } from "./unit";
import { useHashId } from "./useHashId";
import ItemBg from "./item";
import join from "./Image/line.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    content: string;

    parent: HTMLDivElement | null;

    handleScoreChange: (score: number) => void;

    scoreValue: number;

    handleFocused: (res: boolean) => void;

    getEl: (el: HTMLDivElement | null) => void;

    elder: ScoreOption[];

    sibling: Record<string, HTMLDivElement | null>;

    active: boolean;

    range?: ScoreRange[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    content,
    parent,
    handleScoreChange,
    scoreValue,
    handleFocused,
    elder,
    getEl,
    sibling,
    active,
    range,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const ref = useRef<HTMLDivElement | null>(null);

    const id = useHashId("scoreOptions_");

    const offsetX = useRef(0);

    const point = useRef<HTMLDivElement | null>(null);

    const [top, setTop] = useState(() => {
        const sameScore = elder.filter((item) => item.value === scoreValue);

        let height = 0;
        const margin = 5;
        for (let i = 0; i < sameScore.length; i++) {
            const el = sibling[sameScore[i].code];
            height += el?.offsetHeight ? el.offsetHeight + margin : 0;
        }
        return height;
    });

    const [show, setShow] = useState(top === 0);

    const styleRef = useRef<HTMLStyleElement>();

    const leftValueRef = useRef(0);
    const [leftValue, setLeftValue] = useState(0);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        let timer: null | number = null;
        if (top) {
            timer = window.setTimeout(() => {
                setShow(false);
            }, 50);
        } else {
            setShow(true);
        }
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, [top]);

    useLayoutEffect(() => {
        if (!range) {
            return;
        }
        let value = 0;
        let status = false;
        for (let i = 0; i < range.length; ) {
            const item = range[i];

            if (item.value === scoreValue) {
                i = range.length;
                status = true;
                value = item.x;
            } else {
                ++i;
            }
        }
        if (!status) {
            const total = range[range.length - 1].value;
            const s = scoreValue / total;
            value = range[range.length - 1].x * s;
        }

        leftValueRef.current = value;
        setLeftValue(value);
    }, [scoreValue, range]);

    useLayoutEffect(() => {
        const node = ref.current;
        const fn = () => {
            styleRef.current?.remove();
            node?.classList.remove(id);

            if (!node) {
                return;
            }

            let children: HTMLElement | null = null;
            for (let i = 0; i < node.children.length; ) {
                const item = node.children[i];
                if (item instanceof HTMLElement) {
                    children = item;
                    i = node.children.length;
                } else {
                    ++i;
                }
            }

            if (!children) {
                return;
            }
            {
                document.body.offsetWidth;
            }
            const rect = children.getBoundingClientRect();
            let val = 0;
            if (rect.left < 5) {
                val = 5 - rect.left;
            } else if (rect.left + rect.width > document.body.offsetWidth - 5) {
                val = document.body.offsetWidth - 5 - rect.width - rect.left;
            }

            if (val === 0) {
                return;
            }
            styleRef.current = document.createElement("style");
            styleRef.current.innerHTML = `.${id}{
            transform:translateX(${val}px)
          }`;
            node.classList.add(id);
            document.body.append(styleRef.current);
        };
        fn();
        const timer = window.setTimeout(fn, 110);
        return () => {
            window.clearTimeout(timer);
        };
    }, [id, leftValue, scoreValue]);

    useEffect(() => {
        setTop(() => {
            const sameScore = elder.filter((item) => item.value === scoreValue);

            let height = 0;
            const margin = 4;

            for (let i = 0; i < sameScore.length; i++) {
                const el = sibling[sameScore[i].code];
                if (i === 0) {
                    height += 44.21 + 20 + 7;
                }
                height += el?.offsetHeight ? el.offsetHeight + margin : 0;
            }
            return height;
        });
    }, [elder, scoreValue, sibling]);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }
        const el = node.children[0] instanceof HTMLElement ? node.children[0] : null;
        if (!el) {
            return;
        }
        let timer: null | number = null;
        if (active) {
            const activeEl = document.activeElement;
            if (activeEl !== el) {
                timer = window.setTimeout(() => {
                    el.focus({
                        preventScroll: true,
                    });
                });
            }
        }
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, [active]);

    useEffect(() => {
        return () => {
            styleRef.current?.remove();
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleDragEnd = () => {
        offsetX.current = 0;
    };

    const handleDragStart = (res: Point) => {
        handleFocused(true);
        const el = point.current;
        if (!el) {
            return;
        }
        const rect = el.getBoundingClientRect();
        const scrollData = getScrollValue();
        offsetX.current = res.pageX - rect.left - scrollData.x;
    };

    const handleDragMove = (res: Point) => {
        if (!parent) {
            return;
        }
        const rect = parent.getBoundingClientRect();
        const scrollData = getScrollValue();
        const left = res.pageX - offsetX.current - rect.left - scrollData.x;

        if (!range) {
            return;
        }
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
        handleScoreChange(score);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const _style: React.CSSProperties = {
        transform: `translate(${leftValue}px,${top}px)`,
    };
    if (active) {
        _style.zIndex = 99;
    }
    return (
        <div className="ratedOption_items" style={_style}>
            <div className="ratedOption_pointer" ref={point} />
            {show ? (
                <>
                    <div className="ratedOption_score">{scoreValue}分</div>
                    <Icon />
                </>
            ) : (
                <img src={join} className={`ratedOption_joinIcon`} alt="" />
            )}
            <div className="ratedOption_itemsContainer" ref={ref}>
                <Drag
                    className={`ratedOption_item${active ? ` active` : ""}`}
                    handleDragEnd={handleDragEnd}
                    handleDragCancel={handleDragEnd}
                    handleDragStart={handleDragStart}
                    handleDragMove={handleDragMove}
                    tabIndex={-1}
                    ref={(el) => getEl(el)}
                    onFocus={() => {
                        handleFocused(true);
                    }}
                    onBlur={() => {
                        handleFocused(false);
                    }}
                >
                    <ItemBg active={active} />
                    <span
                        className="itemContent"
                        dangerouslySetInnerHTML={{
                            __html: content,
                        }}
                    />
                </Drag>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
