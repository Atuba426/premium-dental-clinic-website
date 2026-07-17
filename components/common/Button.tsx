import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 " +
  "disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-primary-light to-primary text-slate-950 " +
    "shadow-glow hover:shadow-[0_0_50px_-8px_rgba(20,184,166,0.5)] hover:-translate-y-0.5",
  secondary:
    "glass text-white hover:bg-surface-hover hover:border-border-hover hover:-translate-y-0.5",
  ghost: "text-muted hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
}

// Polymorphic props: if `href` is present, render an <a>; otherwise a <button>.
// This keeps CTAs that navigate as real, crawlable, right-click-able links
// (important for a "Book Appointment" link's SEO value and native browser
// behaviors) while still supporting genuine in-page actions like form submit.
type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={(props as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {icon}
    </button>
  );
}
