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
import { DragMoveProps, DragPramsProps, ScoreRange } from "./type";
import { deepCloneData, ScoreOptions } from "./unit";
import { useHashId } from "./useHashId";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    dragOption: ScoreOptions;

    parent: HTMLDivElement | null;

    handleScoreChange: (score: number, left: number) => void;

    scoreValue: number;

    handleFocused: (res: boolean) => void;

    getEl: (el: HTMLDivElement | null) => void;

    elder: ScoreOptions[];

    sibling: Record<string, HTMLDivElement | null>;

    active: boolean;

    range: ScoreRange[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    dragOption,
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

    const [top, setTop] = useState(() => {
        const sameScore = elder.filter((item) => item.score === dragOption.score);

        let height = 0;
        const margin = 5;
        for (let i = 0; i < sameScore.length; i++) {
            const el = sibling[sameScore[i].code];
            height += el?.offsetHeight ? el.offsetHeight + margin : 0;
        }
        return height;
    });

    const dragOptionRef = useRef<string>();

    const [cloneDragOption, setCloneDragOption] = useState(dragOption);

    const styleRef = useRef<HTMLStyleElement>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        setCloneDragOption((pre) => {
            if (dragOptionRef.current === JSON.stringify(dragOption)) {
                return pre;
            } else {
                dragOptionRef.current = JSON.stringify(dragOption);
                return deepCloneData(dragOption);
            }
        });
    }, [dragOption]);

    useEffect(() => {
        const node = ref.current;
        let end = false;
        const fn = () => {
            if (end) {
                return;
            }
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
            end = true;
            window.clearTimeout(timer);
        };
    }, [cloneDragOption, id, top]);

    useEffect(() => {
        const end = false;
        let style: HTMLStyleElement | null = null;
        const node = ref.current;

        const fn = () => {
            if (end) {
                return;
            }
            style?.remove();
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
            style = document.createElement("style");
            style.innerHTML = `.${id}{
            transform:translateX(${val}px)
          }`;
            node.classList.add(id);
            document.body.append(style);
        };
        let timer: null | number = null;
        const main = () => {
            timer && window.clearTimeout(timer);
            timer = window.setTimeout(fn, 100);
        };
        window.addEventListener("resize", main);
        return () => {
            window.removeEventListener("resize", main);
            style?.remove();
            timer && window.clearTimeout(timer);
            node?.classList.remove(id);
        };
    }, [id]);

    useEffect(() => {
        setTop(() => {
            const sameScore = elder.filter((item) => item.score === dragOption.score);

            let height = 0;
            const margin = 5;
            for (let i = 0; i < sameScore.length; i++) {
                const el = sibling[sameScore[i].code];
                height += el?.offsetHeight ? el.offsetHeight + margin : 0;
            }
            return height;
        });
    }, [dragOption, elder, sibling]);

    useEffect(() => {
        const timerFocus = window.setTimeout(() => {
            const node = ref.current;
            if (!node) {
                return;
            }
            const el = node.children[0] instanceof HTMLElement ? node.children[0] : null;
            if (!el) {
                return;
            }

            if (active) {
                const activeEl = document.activeElement;
                if (activeEl !== el) {
                    el.focus({
                        preventScroll: true,
                    });
                }
            }
        });
        return () => {
            timerFocus && window.clearTimeout(timerFocus);
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

    const handleDragStart = (res: DragPramsProps) => {
        const el = ref.current?.parentElement;
        if (!el) {
            return;
        }
        handleFocused(true);
        const rect = el.getBoundingClientRect();
        offsetX.current = res.clientX - rect.left;
    };

    const handleDragMove = (res: DragMoveProps) => {
        if (!parent) {
            return;
        }
        const rect = parent.getBoundingClientRect();
        const left = res.clientX - offsetX.current - rect.left;
        let score = 0;
        let x = 0;
        for (let i = 0; i < range.length; ) {
            const item = range[i];

            if (item.min <= left && item.max > left) {
                i = range.length;
                score = item.value;
                x = item.x;
            } else {
                ++i;
            }
        }
        handleScoreChange(score, x);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const _style: React.CSSProperties = {
        transform: `translate(${dragOption.left}px,${top}px)`,
    };
    if (active) {
        _style.zIndex = 99;
    }
    return (
        <div className="ratedOption_items" style={_style} ref={getEl}>
            {top === 0 ? (
                <>
                    <div className="ratedOption_score">{scoreValue}分</div>
                    <Icon className="ratedOption_icon" />
                </>
            ) : (
                <></>
            )}
            <div className="ratedOption_itemsContainer" ref={ref}>
                <Drag
                    key={dragOption.code}
                    className="ratedOption_item"
                    active={active}
                    handleDragEnd={() => {
                        handleDragEnd?.();
                    }}
                    handleDragStart={(res) => {
                        handleDragStart?.(res);
                    }}
                    handleDragMove={(res) => {
                        handleDragMove?.(res);
                    }}
                    onFocus={() => {
                        handleFocused(true);
                    }}
                    onBlur={() => {
                        handleFocused(false);
                    }}
                >
                    <span
                        className="ratedOption_container"
                        dangerouslySetInnerHTML={{
                            __html: dragOption.content,
                        }}
                    />
                </Drag>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
