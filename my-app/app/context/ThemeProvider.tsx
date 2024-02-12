'use client'
// ThemeContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

// Define types
interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to consume the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Define state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Value to be provided to consuming components
  const value: ThemeContextType = {
    darkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
