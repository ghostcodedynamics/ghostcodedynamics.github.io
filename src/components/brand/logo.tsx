import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

/**
 * GhostCode Dynamics brand mark.
 * SVG-based, easy to replace with a PNG later.
 */
export function Logo({ className, iconOnly = false, size = 28 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <GhostIcon size={size} />
      {!iconOnly && (
        <span className="font-display text-[1.05rem] tracking-tight leading-none">
          <span className="font-bold text-foreground">Ghost</span>
          <span className="font-medium text-muted-foreground">Code Dynamics</span>
        </span>
      )}
    </div>
  );
}

export function GhostIcon({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ghost-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.18 285)" />
          <stop offset="100%" stopColor="oklch(0.62 0.2 245)" />
        </linearGradient>
        <radialGradient id="ghost-glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="oklch(0.85 0.18 285 / 0.4)" />
          <stop offset="100%" stopColor="oklch(0.5 0.2 285 / 0)" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#ghost-glow)" />
      <path
        d="M16 4.5c-5 0-8.5 3.6-8.5 8.5v12.2c0 1 1.1 1.6 1.9 1l1.6-1.2c.4-.3 1-.3 1.4 0l1.6 1.2c.4.3 1 .3 1.4 0l1.6-1.2c.4-.3 1-.3 1.4 0l1.6 1.2c.8.6 1.9 0 1.9-1V13c0-4.9-3.5-8.5-8.4-8.5Z"
        fill="url(#ghost-grad)"
      />
      <circle cx="12.5" cy="14" r="1.4" fill="oklch(0.15 0.02 270)" />
      <circle cx="19.5" cy="14" r="1.4" fill="oklch(0.15 0.02 270)" />
    </svg>
  );
}
