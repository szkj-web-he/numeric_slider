/**
 * 暴露一个获取滚动容器的hook
 */
import { createContext, useContext } from "react";

interface Node {
    current: HTMLDivElement | null;
}

export const ScrollBodyContext = createContext<Node>({ current: null });

export const useScrollBody = (): Node => useContext(ScrollBodyContext);
