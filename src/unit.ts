/**
 * @file 深克隆一下数据
 * @date 2022-06-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-06-14
 */

import { comms } from ".";

export const deepCloneData = <T>(data: T): T => {
    if (data == null) {
        return data;
    }
    return JSON.parse(JSON.stringify(data)) as T;
};

export const getScrollValue = (): {
    x: number;
    y: number;
} => {
    let x = window.scrollX || window.pageXOffset;
    let y = window.scrollY || window.pageYOffset;
    const node = document.documentElement || document.body.parentNode;
    if (!x) {
        x = (typeof node.scrollLeft === "number" ? node : document.body).scrollLeft;
    } else if (!y) {
        y = (typeof node.scrollTop === "number" ? node : document.body).scrollTop;
    }
    return {
        x,
        y,
    };
};

export interface ScaleProps {
    value: number;
    left: number;
    status: 0 | 1 | 2 | 1.5;
}

/**
 * 当 最大刻度值比视口小 时
 * @param margin 两个刻度之间最小距离
 * @param total 容器的总尺寸
 * @param score 总分
 * @returns {scale:ScaleProps[],margin:number,incrementVal:number,v:number}
 * scale => 刻度列表
 * margin => 每个刻度之间的像素距离
 * incrementVal => 每个刻度之间相差的分数
 * v => 一分 需要多少像素
 */
const normalScale = (
    margin: number,
    total: number,
    score: number,
): { scale: ScaleProps[]; margin: number; incrementVal: number; v: number } => {
    const arr: ScaleProps[] = [
        {
            value: 0,
            left: 0,
            status: 2,
        },
    ];

    // 1刻度 等于多少像素
    const d = total / score;

    let incrementVal = 1;
    if (d < margin) {
        incrementVal = Math.ceil(margin / d);
    }

    let count = 0;
    for (let i = incrementVal; i < score; i += incrementVal) {
        ++count;
        const data: ScaleProps = {
            value: i,
            left: i * d,
            status: 0,
        };
        if (count === 5) {
            data.status = 1;
        } else if (count === 10) {
            data.status = 2;
            count = 0;
        }

        const val = data.left + d * incrementVal;

        if (data.status === 2) {
            if (val > total - 50) {
                data.status = 1.5;
            }
            arr.push(data);
        } else if (val <= total) {
            arr.push(data);
        }

        if (i + incrementVal >= score) {
            arr.push({
                value: score,
                left: total,
                status: 2,
            });
        }
    }
    return { scale: arr, margin: d * incrementVal, incrementVal, v: d };
};

/**
 * 设置刻度值
 */
export const setScale = ():
    | { scale: ScaleProps[]; margin: number; incrementVal: number; v: number }
    | undefined => {
    if (!comms.config.totalScore) {
        return;
    }
    const minMargin = 10;
    //页面两个的可视区域给了16的padding值
    const padding = 16 * 2;

    const total = document.body.clientWidth - padding;

    const { totalScore } = comms.config;

    return normalScale(minMargin, total, totalScore);
};

export const drawRect = (
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    width: number,
    height: number,
): void => {
    if (!ctx) {
        return;
    }
    const r = 2;
    ctx.arc(width - r, height - r, r, 0, Math.PI / 2);
    ctx.lineTo(x + 7 - r, height);
    ctx.arc(x + 7 - r, height - r, r, Math.PI / 2, (Math.PI / 4) * 3);
    ctx.lineTo(x, height - 7);
    ctx.arc(x + r, height - 7, r, (Math.PI / 4) * 3, Math.PI);
    ctx.lineTo(x, y - r);
    ctx.arc(x + r, y - r, r, Math.PI, Math.PI + Math.PI / 2);
    ctx.lineTo(width - 7, y);
    ctx.arc(width - 7, y + 2, r, Math.PI + Math.PI / 2, Math.PI + (Math.PI / 4) * 3);
    ctx.lineTo(width, y + 7);
    ctx.arc(width - r, y + 7, r, Math.PI + (Math.PI / 4) * 3, 2 * Math.PI);
    ctx.closePath();
};
