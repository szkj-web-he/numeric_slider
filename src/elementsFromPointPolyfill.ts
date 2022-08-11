const elementsFromPointPolyfill = (x: number, y: number) => {
    const elements: Array<HTMLElement> = [];
    const pointerEvents: Array<string> = [];
    let el: Element | null = null;

    do {
        if (el !== document.elementFromPoint(x, y)) {
            el = document.elementFromPoint(x, y);
            if (el instanceof HTMLElement) {
                elements.push(el);
                pointerEvents.push(el.style.pointerEvents);
                el.style.pointerEvents = "none";
            }
        } else {
            el = null;
        }
    } while (el);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.pointerEvents = pointerEvents[i];
    }

    return elements;
};

if (typeof document !== "undefined" && typeof document.elementsFromPoint === "undefined") {
    document.elementsFromPoint = elementsFromPointPolyfill;
}
