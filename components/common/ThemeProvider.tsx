"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "eversmile-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 1. Initialize state directly from the DOM attribute if it was already set by 
  // your blocking script in layout.tsx. Fallback to "dark" if it hasn't run yet.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const existingAttr = document.documentElement.getAttribute("data-theme") as Theme | null;
      if (existingAttr === "light" || existingAttr === "dark") {
        return existingAttr;
      }
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    }
    return "dark";
  });

  // 2. Synchronize state changes outward to the DOM and LocalStorage.
  // This satisfies React's guideline: updating an external system with the latest state.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}