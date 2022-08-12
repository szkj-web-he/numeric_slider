/**
 * @file 要被评价的选项
 * @date 2022-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { Drag } from "./Drag";
import Icon from "./icon";
import { DragMoveProps, OptionProps, ScoreRange } from "./type";
import { useHashId } from "./useHashId";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    options: Array<OptionProps>;

    range: ScoreRange[];

    // parent: HTMLDivElement | null;

    handleDragStart?: (res: OptionProps) => void;

    handleDragMove?: (res: DragMoveProps) => void;

    handleDragEnd?: (res: OptionProps) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    options,
    range,
    parent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const ref = useRef<HTMLDivElement | null>(null);

    const [left, setLeft] = useState(0);

    const [score, setScore] = useState(0);

    const id = useHashId("scoreOptions_");

    const [focus, setFocus] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
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
    }, [options, id]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const onFocus = () => {
        setFocus(true);
    };
    const onBlur = () => {
        setFocus(false);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const _style: React.CSSProperties = {
        transform: `translateX(${left}px)`,
    };
    if (focus) {
        _style.zIndex = 99;
    }

    return (
        <div className="ratedOption_items" style={_style}>
            <div className="ratedOption_score">{score}分</div>
            <Icon className="ratedOption_icon" />
            <div className="ratedOption_itemsContainer" ref={ref}>
                {options.map((option) => {
                    return (
                        <Drag
                            key={option.code}
                            className="ratedOption_item"
                            activeClassName="active"
                            handleDragEnd={() => {
                                handleDragEnd?.({ ...option });
                            }}
                            handleDragStart={() => {
                                handleDragStart?.({ ...option });
                            }}
                            handleDragMove={(res) => {
                                handleDragMove?.(res);
                            }}
                            onFocus={onFocus}
                            onBlur={onBlur}
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
