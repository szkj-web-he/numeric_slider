import { createContext, useContext } from "react";

export const JumpContext = createContext<string>("");

export const useGroupEl = (): string => useContext(JumpContext);
