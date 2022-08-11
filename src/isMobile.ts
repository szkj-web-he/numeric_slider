export const isMobile = (): boolean => {
    return window.matchMedia("(any-pointer:coarse)").matches;
};
