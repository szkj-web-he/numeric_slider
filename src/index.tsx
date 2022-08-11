import "./font.scss";
import "./style.scss";
import "./elementsFromPointPolyfill.ts";
import React, { useEffect, useRef, useState } from "react";

import { PluginComms, ConfigYML } from "@possie-engine/dr-plugin-sdk";
import Header from "./header";
import MainContent from "./main";
import { ScrollComponent } from "./Scroll";
import { isMobile } from "./isMobile";
import { DeviceContext } from "./isMobileContext";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
}) as {
    config: {
        question?: string;
        instruction?: string;
        optionsInstruction?: string;
        options?: Array<{ code: string; content: string }>;
        totalScore?: number;
    };
    state: unknown;
    renderOnReady: (res: React.ReactNode) => void;
};

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [loading, setLoading] = useState(true);

    const ref = useRef<HTMLDivElement | null>(null);

    const [mobileStatus, setMobileStatus] = useState(isMobile());
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        void document.fonts.ready.then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const fn = () => {
            setMobileStatus(isMobile());
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const content = (
        <>
            <Header />
            <MainContent />
        </>
    );
    const mobile = isMobile();
    return (
        <DeviceContext.Provider value={mobileStatus}>
            <div className="wrapper">
                {loading && <>加载字体中……</>}
                {mobile ? (
                    <div
                        className="mobileScroll"
                        ref={ref}
                        style={
                            loading
                                ? {
                                      height: 0,
                                      opacity: 0,
                                  }
                                : {}
                        }
                    >
                        {content}
                    </div>
                ) : (
                    <ScrollComponent
                        style={
                            loading
                                ? {
                                      height: 0,
                                      opacity: 0,
                                  }
                                : {}
                        }
                        ref={ref}
                        hidden={{ x: true }}
                    >
                        {content}
                    </ScrollComponent>
                )}
            </div>
        </DeviceContext.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
