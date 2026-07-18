"use client";

import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "@/components/common/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      {isDark ? (
        <HiOutlineSun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <HiOutlineMoon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
