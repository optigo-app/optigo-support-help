import React, { createContext, useContext, useState } from "react";
const CommonContext = createContext({
    Open: false,
    setOpen: () => { }
});

export const useCommon = () => {
    const context = useContext(CommonContext);
    if (!context) {
        throw new Error("useCommon must be used within an CommonProvider");
    }
    return context;
};

const CommonProvider = ({ children }) => {
    const [Open, setOpen] = useState(false);

    const ContextValue = {
        Open,
        setOpen
    }
    return (
        <>
            <CommonContext.Provider value={ContextValue}>{children}</CommonContext.Provider>
        </>
    );
};

export default CommonProvider;
