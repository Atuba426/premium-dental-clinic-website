import { ElementType, ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  /** Controls the actual rendered heading tag so document outline stays
   *  correct regardless of the section's visual size. Hero owns the page's
   *  single h1; every other section header defaults to h2. */
  headingLevel?: ElementType;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  headingLevel: Heading = "h2",
  className = "",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment} max-w-2xl ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-light">
          {eyebrow}
        </span>
      )}
      <Heading className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
