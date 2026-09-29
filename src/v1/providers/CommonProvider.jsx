import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainTabs } from "../constants/data";
const CommonContext = createContext({
  Open: false,
  setOpen: () => {},
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
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    const category = mainTabs?.find((c) => c.TabId === newValue);
    if (!category) return;
    setActiveTab(newValue);
    navigate(`/${category?.TabId}/category/${encodeURI(category?.label)}`, {
      replace: true,
    });
  };

  const ContextValue = {
    Open,
    setOpen,
    activeTab,
    handleTabChange,
    setActiveTab,
  };
  return (
    <>
      <CommonContext.Provider value={ContextValue}>
        {children}
      </CommonContext.Provider>
    </>
  );
};

export default CommonProvider;
