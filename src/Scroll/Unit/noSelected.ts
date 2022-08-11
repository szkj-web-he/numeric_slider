export const stopSelect = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLDivElement>,
    selectedFn: { current: typeof document.onselectstart },
    stopPropagation?: boolean,
): void => {
    stopPropagation && e.stopPropagation();
    window.getSelection()?.removeAllRanges();
    selectedFn.current = document.onselectstart;
    document.onselectstart = () => false;
};
