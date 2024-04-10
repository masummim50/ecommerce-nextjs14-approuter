"use client";
import React, { createContext, useContext, useState } from "react";

interface StateContextType {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const themeContext = createContext<StateContextType | undefined>(undefined);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  return (
    <themeContext.Provider value={{ dark, setDark }}>
      <div className={`${dark ? "dark" : ""}`}>{children}</div>
    </themeContext.Provider>
  );
};

export const useThemeContext = () => {
  const theme = useContext(themeContext);
  if (!theme) {
    throw new Error("context not available");
  }
  return theme;
};

export default ThemeContextProvider;
