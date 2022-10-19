/**
 * @file 需要评分的选项
 * @date 2022-08-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { comms } from ".";
import { ScrollComponent } from "./Scroll";
import { OptionProps, ScoreOption } from "./type";
import { deepCloneData } from "./unit";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    setList: (res: ScoreOption[]) => void;

    list: ScoreOption[];

    setSelectOption: (option?: OptionProps) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ setList, list, setSelectOption }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleClick = (item: OptionProps) => {
        let n = -1;
        for (let i = 0; i < list.length; ) {
            if (list[i].code === item.code) {
                n = i;
                i = list.length;
            } else {
                ++i;
            }
        }
        const arr = deepCloneData(list);

        if (n >= 0) {
            arr.splice(n, 1);
            setSelectOption();
        } else {
            arr.push({ ...item, value: 0 });
            setSelectOption(deepCloneData(item));
        }
        setList([...arr]);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const content = (
        <div className="options_items">
            {comms.config.options?.map((item) => {
                const isActive = list.some((option) => option.code === item.code);
                return (
                    <div
                        key={item.code}
                        className={`item${isActive ? " active" : ""}`}
                        onClick={() => handleClick(item)}
                    >
                        <span
                            className="itemContent"
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="options">
            <div className="options_total">
                共 <span className="options_totalVal">{comms.config.options?.length ?? 0}</span>项
            </div>
            <ScrollComponent hidden={{ x: true }} bodyClassName="options_scrollBody">
                {content}
            </ScrollComponent>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
