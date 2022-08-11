import { createContext, useContext } from "react";

export interface BoxItem {
    id: string;
    el: Element | null;
}

interface DragData {
    boxes: Array<BoxItem>;
}

const defaultDragData = (): DragData => {
    return {
        boxes: [],
    };
};

export const DragContext = createContext(defaultDragData());

export const useDragContext = (): DragData => useContext(DragContext);
