/**
 * @file setScrollBar style
 * @date 2021-12-15
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-15
 */

export interface PublicDataProps {
    startVal: number;
    mouseStatus: false | "vertical" | "horizontal";
}

interface ScrollReturn {
    width: number;
    height: number;
    top: number;
    left: number;
}

/**
 *
 * @param { HTMLElement | null} el
 * @returns {ScrollReturn}
 */
export const setScrollBar = (el: HTMLElement | null): ScrollReturn => {
    let [width, height, top, left] = [0, 0, 0, 0];
    if (el) {
        const offsetHeight = el.offsetHeight;
        const scrollHeight = el.scrollHeight;
        const offsetWidth = el.offsetWidth;
        const scrollWidth = el.scrollWidth;
        const scrollTop = Math.round(el.scrollTop);
        const scrollLeft = Math.round(el.scrollLeft);

        if (scrollHeight > offsetHeight) {
            height = (offsetHeight / scrollHeight) * offsetHeight;

            if (height < 15) {
                const mHeight = 15;

                const mTop = top / (mHeight / height);
                height = mHeight;
                top = mTop;
            }
            top = (scrollTop / (scrollHeight - offsetHeight)) * (offsetHeight - height);
        }
        if (scrollWidth > offsetWidth) {
            width = (offsetWidth / scrollWidth) * offsetWidth;

            if (width < 15) {
                width = 15;
            }
            left = (scrollLeft / (scrollWidth - offsetWidth)) * (offsetWidth - width);
        }
    }

    // 给bar赋值样式
    const parent = el?.parentElement;
    if (parent) {
        // 横向滚动条 element
        let hEl: HTMLElement | null = null;
        // 纵向滚动条 element
        let vEl: HTMLElement | null = null;

        for (let i = 0; i < parent.children.length; i++) {
            const cEl = parent.children[i];
            const className = cEl.getAttribute("class");
            if (className?.includes("scroll_scrollBar__horizontal")) {
                hEl = cEl as HTMLElement;
            } else if (className?.includes("scroll_scrollBar__vertical")) {
                vEl = cEl as HTMLElement;
            }
        }

        if (hEl) {
            hEl.style.width = `${width}px`;
            hEl.style.transform = `translateX(${left}px)`;
        }

        if (vEl) {
            vEl.style.height = `${height}px`;
            vEl.style.transform = `translateY(${top}px)`;
        }
    }
    return {
        width,
        height,
        top,
        left,
    };
};
