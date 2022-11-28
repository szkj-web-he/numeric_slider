import { useCallback, useEffect, useRef, useState } from "react";
import { getScrollBody } from "./getScrollBody";

type RefObject<T> = React.MutableRefObject<T>;

interface ActiveStatusResult {
    show: boolean;
    topActive: boolean;
    bottomActive: boolean;
    activeIndex: RefObject<number>;
    isBottom: boolean;
    update: () => void;
}

export const getElements = (id: string): HTMLElement[] => {
    const els = document.querySelectorAll(`.${id}`);
    const arr: HTMLElement[] = [];
    for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el instanceof HTMLElement) {
            const index = el.getAttribute("data-index");
            if (index) {
                arr[Number(index)] = el;
            }
        }
    }
    return arr;
};

/**
 * 第一个node界定啊的top距离和第二个node节点的top距离之前的差值
 */
export const sameTop = (el: HTMLElement, parent: HTMLElement): number => {
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    return elRect.top - parentRect.top;
};

export const useActiveStatus = (
    ref: RefObject<HTMLDivElement | null>,
    id: string,
): ActiveStatusResult => {
    const [show, setShow] = useState(false);
    const [topActive, setTopActive] = useState(false);
    const [bottomActive, setBottomActive] = useState(false);
    const activeIndex = useRef(0);
    const [isBottom, setIsBottom] = useState(false);

    const update = useCallback(() => {
        if (!ref.current) {
            return;
        }

        const scrollBody = getScrollBody(ref.current);

        if (!scrollBody) {
            return;
        }

        const arr = getElements(id);
        let n = -1;
        for (let i = 0; i < arr.length; ) {
            const item = arr[i];
            const marginTop = sameTop(item, scrollBody);

            if (marginTop > -5) {
                n = i;
                i = arr.length;
            } else if (marginTop < 0) {
                ++i;
            }
        }

        setShow(!!(scrollBody && scrollBody.offsetHeight < scrollBody.scrollHeight));
        setIsBottom(
            !!(
                scrollBody &&
                scrollBody.offsetHeight + scrollBody.scrollTop >= scrollBody.scrollHeight
            ),
        );
        activeIndex.current = n;
        setTopActive(n > 0);
        setBottomActive(n < arr.length - 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        update();
    }, [update]);
    return {
        show,
        topActive,
        bottomActive,
        activeIndex,
        isBottom,
        update,
    };
};
