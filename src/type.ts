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

/**
 * 刻度属性
 */
export interface ScaleAttrProps {
    //每个刻度之间的像素距离
    margin: number;
    //每个刻度之间相差的分数
    value: number;
    //一分 需要多少像素
    v: number;
}

export interface ScoreOption extends OptionProps {
    score: number;
}

/**
 * 每个分数所对应的像素范围
 */
export interface ScoreRange {
    value: number;
    min: number;
    max: number;
    x: number;
}
