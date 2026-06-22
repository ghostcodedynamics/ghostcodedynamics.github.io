/**
 * GhostCode Dynamics — Brand Logo System
 * ---------------------------------------------------------------
 * This file is the single source of truth for the brand mark across
 * the navbar, footer, mobile menu, favicon, OG images, etc.
 *
 * REPLACING THE PLACEHOLDER WITH THE FINAL PNG (≤ 2 min):
 *   1. Drop the final files into `src/assets/brand/`:
 *        - logo-mark.png         (square icon, ≥ 512×512)
 *        - logo-mark-light.png   (optional, for light backgrounds)
 *        - logo-full.png         (optional full lockup; if absent we
 *                                 keep the SVG monogram + typeset wordmark)
 *   2. Flip `USE_PNG_MARK = true` below.
 *   3. (Optional) Replace `public/favicon.svg` with the new icon.
 *
 * Nothing else in the codebase needs to change — every surface
 * imports <Logo />, <LogoCompact />, or <LogoMark /> from this file.
 * ---------------------------------------------------------------
 */

import { cn } from "@/lib/utils";

// Toggle this to `true` once the founder ships the final PNG assets.
const USE_PNG_MARK = false;

// When USE_PNG_MARK is true these are imported lazily by <LogoMark />.
// Keeping them as string paths means the build never fails if the
// PNGs are not yet present in the repo.
const PNG_MARK_DARK = "/brand/logo-mark.png";
const PNG_MARK_LIGHT = "/brand/logo-mark-light.png";

// ---------------------------------------------------------------
// Variant: <LogoMark /> — icon only (favicon, app icon, avatar)
// ---------------------------------------------------------------

interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Force a specific contrast mode. Defaults to currentColor (auto). */
  tone?: "auto" | "dark" | "light";
}

/**
 * Ghost-in-monogram mark. Pure SVG so it is sharp on every density,
 * inherits theme color via `currentColor`, and ships zero bytes of
 * raster data until the real PNG is wired in.
 */
export function LogoMark({ size = 32, className, tone = "auto" }: LogoMarkProps) {
  if (USE_PNG_MARK) {
    const src = tone === "light" ? PNG_MARK_LIGHT : PNG_MARK_DARK;
    return (
      <img
        src={src}
        width={size}
        height={size}
        alt="GhostCode Dynamics"
        className={cn("shrink-0 select-none", className)}
        draggable={false}
      />
    );
  }

  const fg =
    tone === "dark"
      ? "#0a0a0f"
      : tone === "light"
        ? "#ffffff"
        : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="GhostCode Dynamics"
      shapeRendering="geometricPrecision"
    >
      {/* Rounded squircle backdrop — the monogram "G" */}
      <rect x="1" y="1" width="62" height="62" rx="16" fill={fg} />

      {/* Ghost silhouette cut out of the squircle */}
      <path
        d="M32 16c-7 0-12 5-12 12v18.2c0 1.4 1.6 2.2 2.7 1.3l2.2-1.7c.6-.5 1.5-.5 2.1 0l2.2 1.7c.6.5 1.5.5 2.1 0l2.2-1.7c.6-.5 1.5-.5 2.1 0l2.2 1.7c1.1.9 2.7.1 2.7-1.3V28c0-7-5-12-12-12Z"
        fill="var(--background)"
      />

      {/* Eyes — restate foreground for a crisp 3-tone read */}
      <circle cx="28.4" cy="29.5" r="1.9" fill={fg} />
      <circle cx="35.6" cy="29.5" r="1.9" fill={fg} />

      {/* Subtle "C / D" tick: opening on the right side of the G */}
      <path
        d="M46 30v6"
        stroke="var(--background)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------
// Variant: <Logo /> — full lockup (icon + "GhostCode Dynamics")
// ---------------------------------------------------------------

interface LogoProps {
  className?: string;
  size?: number;
  /** Hide the wordmark, keep only the mark. */
  iconOnly?: boolean;
}

export function Logo({ className, size = 32, iconOnly = false }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.02]",
        className,
      )}
      aria-label="GhostCode Dynamics"
    >
      <LogoMark size={size} />
      {!iconOnly && <Wordmark />}
    </span>
  );
}

// ---------------------------------------------------------------
// Variant: <LogoCompact /> — icon + "GCD" (tight navs, mobile)
// ---------------------------------------------------------------

export function LogoCompact({ className, size = 28 }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 transition-transform duration-300 ease-out group-hover:scale-[1.02]",
        className,
      )}
      aria-label="GhostCode Dynamics"
    >
      <LogoMark size={size} />
      <span className="font-display text-base font-semibold tracking-[0.18em] text-foreground">
        GCD
      </span>
    </span>
  );
}

// ---------------------------------------------------------------
// Wordmark — geometric, Linear / Vercel / Stripe inspired
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

// Re-export the icon under its previous name to keep older imports working.
export { LogoMark as GhostIcon };
