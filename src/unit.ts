/**
 * @file 深克隆一下数据
 * @date 2022-06-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-06-14
 */

import { comms } from ".";

export const deepCloneData = <T>(data: T): T => {
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
    status: 0 | 1 | 2;
}

/**
 * 当 最大刻度值比视口小 时
 */
const normalScale = (margin: number, total: number, score: number) => {
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
        if (data.left + d * incrementVal <= total) {
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
    return { scale: arr, margin: d * incrementVal };
};

/**
 * 设置刻度值
 */
export const setScale = ():
    | {
          scale: ScaleProps[];
          margin: number;
      }
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
