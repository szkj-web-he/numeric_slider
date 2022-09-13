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

export interface ScoreOption extends OptionProps {
    value: number;
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

export interface Point {
    pageX: number;
    pageY: number;
    offsetX: number;
    offsetY: number;
    clientX: number;
    clientY: number;
}
