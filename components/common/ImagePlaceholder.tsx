import { HiOutlinePhoto } from "react-icons/hi2";

interface ImagePlaceholderProps {
  /** Describes what real image belongs here, e.g. "Portrait of Dr. Amara Reyes". */
  label: string;
  /** e.g. "1200x1400" — shown as a small caption so the correct asset can be sourced later. */
  ratioHint?: string;
  className?: string;
  rounded?: string;
}

export default function ImagePlaceholder({
  label,
  ratioHint,
  className = "",
  rounded = "rounded-2xl",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-border-hover bg-linear-to-br from-surface to-transparent ${rounded} ${className}`}
    >
      <HiOutlinePhoto className="h-8 w-8 text-muted/60" aria-hidden="true" />
      <span className="px-4 text-center text-xs font-medium text-muted/60">
        {label}
      </span>
      {ratioHint && (
        <span className="text-[11px] text-muted/40">{ratioHint}</span>
      )}
    </div>
  );
}
