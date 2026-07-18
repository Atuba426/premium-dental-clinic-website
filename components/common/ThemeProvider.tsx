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
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Deferring execution breaks the synchronous render phase loop,
    // safely clearing out the "cascading renders" warning.
    const timeoutId = setTimeout(() => {
      const existingAttr = document.documentElement.getAttribute("data-theme") as Theme | null;
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      
      if (existingAttr === "light" || existingAttr === "dark") {
        setTheme(existingAttr);
      } else if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Update DOM attributes asynchronously based on state changes
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