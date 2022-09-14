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

        const arr = getElements(id);

        let n = -1;
        const scrollTop = scrollBody?.scrollTop ?? 0;
        for (let i = 0; i < arr.length; ) {
            const item = arr[i];
            if (i === arr.length - 1) {
                if (item && item?.offsetTop + item.offsetHeight > scrollTop) {
                    n = i;
                    i = arr.length;
                } else {
                    ++i;
                }
            } else if (item && item?.offsetTop >= scrollTop) {
                n = i;
                i = arr.length;
            } else {
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
    }, [id, ref]);

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
