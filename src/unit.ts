/**
 * @file 深克隆一下数据
 * @date 2022-06-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-06-14
 */

import { comms } from ".";
import { OptionProps } from "./type";

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
            if (left === total) {
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
    const padding = 20 * 2;

    const total = document.body.clientWidth - padding;

    const { totalScore } = comms.config;

    return normalScale(minMargin, total, totalScore);
};
/**
 * 将选中的需要评分的选项转化为
 * 分数: 选项
 * 格式的方法
 *
 *
 */

export interface ScoreOptions extends OptionProps {
    score: number;
    left: number;
}

export const transformScoreOptions = (res: OptionProps[], pre?: ScoreOptions[]): ScoreOptions[] => {
    const arr: ScoreOptions[] = [];
    for (let i = 0; i < res.length; i++) {
        let score = 0;
        let left = 0;
        if (pre) {
            for (let j = 0; j < pre.length; ) {
                const option = pre[j];
                if (option.code === res[i].code) {
                    score = option.score;
                    left = option.left;
                    j = pre.length;
                } else {
                    ++j;
                }
            }
        }

        arr.push({
            code: res[i].code,
            content: res[i].content,
            left,
            score,
        });
    }
    return arr;
};

export const forceReflow = (): number => document.body.offsetHeight;
