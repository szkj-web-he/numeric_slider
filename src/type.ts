export interface OptionProps {
    code: string;
    content: string;
}

export interface PointProps {
    offsetX: number;
    offsetY: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface DragPramsProps extends PointProps {
    clientX: number;
    clientY: number;
}

export interface DragMoveProps extends DragPramsProps {
    name?: string;
}

export interface ParkingProps {
    id: string;
    value?: OptionProps;
}

export interface PublicTempProps {
    /**
     * 是否为手机端
     */
    mobileStatus: boolean;
    /**
     * 拖拽move的回调
     */
    handleDragMove: (res: { data: OptionProps; to?: string; from?: string }) => void;
    /**
     * 拖拽结束
     */
    handleDragEnd: () => void;
}
