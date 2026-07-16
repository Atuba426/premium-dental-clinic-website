import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400",

        variant === "primary" &&
          "bg-teal-500 text-white hover:bg-teal-600",

        variant === "secondary" &&
          "border border-slate-600 bg-transparent text-white hover:bg-slate-800",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}