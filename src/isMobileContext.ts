import { createContext, useContext } from "react";
import { isMobile } from "./isMobile";

export const DeviceContext = createContext(isMobile());

export const useMobileStatus = (): boolean => useContext(DeviceContext);
