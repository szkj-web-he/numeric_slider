export const getScrollBody = (node: HTMLElement | null): HTMLElement | undefined => {
    if (!node) {
        return;
    }

    let el: null | HTMLElement = null;
    const childList = node.children;
    for (let i = 0; i < childList.length; ) {
        const child = childList[i];
        const className = child.getAttribute("class");
        if (className?.includes("scroll_scrollBody") && child instanceof HTMLElement) {
            i = childList.length;
            el = child;
        } else {
            ++i;
        }
    }

    if (!el) {
        return;
    }
    return el;
};
