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
/**
 * 0 => 小刻度
 * 1 => 两个大刻度之间的中刻度
 * 2 => 大刻度
 * 1.5 => 也是大刻度  只是因为临近终点 且又不是最总的值 所以不做展示
 */
type ScaleStatus = 0 | 1 | 2 | 1.5;

export interface ScaleProps {
    value: number;
    left: number;
    status: ScaleStatus;
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
const normalScale = (margin: number, total: number, score: number): ScaleProps[] => {
    //递增的分数值
    let dScore: number;
    //递增的像素值
    let dPx: number;
    if (total / score > margin && score < Math.floor(total / 10)) {
        /**
         * 可以放下
         * 且分割的数量小于总宽度的1/10
         */
        dScore = 1;
        dPx = total / score;
    } else {
        /**
         * 看看总宽度 可以被谁整除
         * 从最小的margin值开始递增
         * 直到可以被整除为止
         */
        let reasonableMargin = margin;
        /**
         * 由这个margin一个分成了多少等分
         * 一定是个整数
         * 不能是小数
         */
        let bisectrix = total / reasonableMargin + 1;
        /**
         * 分割的数量 成大于自身的1/10
         * 不然看起来会很凌乱
         */
        while (bisectrix > Math.floor(total / 10) || bisectrix > score) {
            reasonableMargin++;
            bisectrix = Math.floor(total / reasonableMargin);
        }

        /**
         * 看看递增值是多少
         */
        dScore = Math.floor(score / bisectrix);
        dPx = reasonableMargin;
    }

    const arr: ScaleProps[] = [];

    let index = 0;

    const endLength = String(score).length * 8;

    for (let i = 0; i < score; i += dScore) {
        const left = (i / dScore) * dPx;
        if (left > total) {
            i = score;
        } else {
            let status: ScaleStatus = 0;
            if (!(index % 10)) {
                status = 2;
                index = 0;
            } else if (!(index % 5)) {
                status = 1;
            }
            ++index;

            const length = (String(i).length * 8) / 2;

            if (left + length + endLength + 5 >= total && status === 2) {
                status = 1.5;
            }
            if (left > total - dPx) {
                i = score;
            } else {
                arr.push({
                    value: i,
                    left,
                    status,
                });
            }
        }
    }

    arr.push({
        value: score,
        left: total,
        status: 2,
    });

    return arr;
};

/**
 * 设置刻度值
 */
export const setScale = (): ScaleProps[] | undefined => {
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
    //右下1/4圆
    ctx.arc(width - r, height - r, r, 0, Math.PI / 2);
    // 左下
    ctx.lineTo(x + 7 - r, height);
    // 左下1/8的圆
    ctx.arc(x + 7 - r, height - r, r, Math.PI / 2, (Math.PI / 4) * 3);
    // 左中
    const m = Math.sqrt(r ** 2 / 2);

    ctx.lineTo(x + (r - m), height - 7 + m);
    //左中的1/8的圆
    ctx.arc(x + r, height - 7, r, (Math.PI / 4) * 3, Math.PI);
    //左上
    ctx.lineTo(x, y + r);
    //左上1/4圆
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI + Math.PI / 2);
    //右上
    ctx.lineTo(width - 7, y);
    //右上的1/8的圆
    ctx.arc(width - 7, y + r, r, Math.PI + Math.PI / 2, Math.PI + (Math.PI / 4) * 3);
    //右中
    ctx.lineTo(width - r + m, y + 7 - m);
    //右中的1/8的圆
    ctx.arc(width - r, y + 7, r, Math.PI + (Math.PI / 4) * 3, 2 * Math.PI);
    ctx.closePath();
};

export const forceReflow = (): number => document.body.offsetHeight;
