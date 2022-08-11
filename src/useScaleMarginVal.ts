import { createContext, useContext } from "react";

interface ScaleMarginProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const ScaleMargin = createContext<ScaleMarginProps>({
    value: 0,
    setValue: () => undefined,
});

export const useScaleMarginVal = (): ScaleMarginProps => useContext(ScaleMargin);
