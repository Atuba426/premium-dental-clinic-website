import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx("mb-12 text-center", className)}>
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}