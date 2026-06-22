/**
 * GhostCode Dynamics — Brand Logo System
 * ---------------------------------------------------------------
 * Single source of truth for the brand mark.
 *
 * REPLACING THE PLACEHOLDER:
 *   Drop the final file at `src/assets/brand/logo.png` (same path).
 *   No code change needed — every surface reads from this file.
 *   If the PNG is ever missing, the inline SVG fallback renders
 *   automatically so layout never breaks.
 * ---------------------------------------------------------------
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import logoPng from "@/assets/brand/logo.png";

// ---------------------------------------------------------------
// <LogoMark /> — icon only, height-driven, aspect-preserving
// ---------------------------------------------------------------

interface LogoMarkProps {
  /** Rendered height in px. Width auto-scales to preserve aspect ratio. */
  height?: number;
  className?: string;
  tone?: "auto" | "dark" | "light";
}

export function LogoMark({ height = 36, className, tone = "auto" }: LogoMarkProps) {
  const [failed, setFailed] = useState(false);

  if (!failed && logoPng) {
    return (
      <img
        src={logoPng}
        alt="GhostCode Dynamics"
        onError={() => setFailed(true)}
        style={{ height, width: "auto" }}
        className={cn("shrink-0 select-none object-contain", className)}
        draggable={false}
      />
    );
  }

  // ---- SVG fallback (only renders if PNG fails to load) ----
  const fg =
    tone === "dark" ? "#0a0a0f" : tone === "light" ? "#ffffff" : "currentColor";
  return (
    <svg
      height={height}
      width={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="GhostCode Dynamics"
      shapeRendering="geometricPrecision"
    >
      <rect x="1" y="1" width="62" height="62" rx="16" fill={fg} />
      <path
        d="M32 16c-7 0-12 5-12 12v18.2c0 1.4 1.6 2.2 2.7 1.3l2.2-1.7c.6-.5 1.5-.5 2.1 0l2.2 1.7c.6.5 1.5.5 2.1 0l2.2-1.7c.6-.5 1.5-.5 2.1 0l2.2 1.7c1.1.9 2.7.1 2.7-1.3V28c0-7-5-12-12-12Z"
        fill="var(--background)"
      />
      <circle cx="28.4" cy="29.5" r="1.9" fill={fg} />
      <circle cx="35.6" cy="29.5" r="1.9" fill={fg} />
    </svg>
  );
}

// ---------------------------------------------------------------
// <Logo /> — full lockup (mark + wordmark)
// ---------------------------------------------------------------

interface LogoProps {
  className?: string;
  /** Mark height in px. Defaults sized for navbar use. */
  height?: number;
  iconOnly?: boolean;
}

export function Logo({ className, height, iconOnly = false }: LogoProps) {
  // Responsive default: 36px mobile → 42px desktop. Caller can override.
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.02]",
        className,
      )}
      aria-label="GhostCode Dynamics"
    >
      {height ? (
        <LogoMark height={height} />
      ) : (
        <>
          <LogoMark height={36} className="sm:hidden" />
          <LogoMark height={42} className="hidden sm:block" />
        </>
      )}
      {!iconOnly && <Wordmark />}
    </span>
  );
}

// ---------------------------------------------------------------
// <LogoCompact /> — icon + "GCD"
// ---------------------------------------------------------------

export function LogoCompact({ className, height = 32 }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 transition-transform duration-300 ease-out group-hover:scale-[1.02]",
        className,
      )}
      aria-label="GhostCode Dynamics"
    >
      <LogoMark height={height} />
      <span className="font-display text-base font-semibold tracking-[0.18em] text-foreground">
        GCD
      </span>
    </span>
  );
}

// ---------------------------------------------------------------
// Wordmark
// ---------------------------------------------------------------

function Wordmark() {
  return (
    <span className="font-display text-[1.02rem] leading-none tracking-tight text-foreground">
      <span className="font-semibold">Ghost</span>
      <span className="font-medium text-foreground/85">Code</span>
      <span className="mx-1 text-muted-foreground/60">·</span>
      <span className="font-medium tracking-[0.02em] text-muted-foreground">
        Dynamics
      </span>
    </span>
  );
}

export { LogoMark as GhostIcon };
