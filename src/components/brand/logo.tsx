/**
 * GhostCode Dynamics — Brand Logo System
 * ---------------------------------------------------------------
 * Single source of truth for the brand mark.
 *
 * Assets live in `src/assets/brand/`:
 *   - logo-dark.png   (white art, used in dark mode)
 *   - logo-light.png  (black art, used in light mode)
 *   - icon-dark.png   (ghost-G mark, white, dark mode)
 *   - icon-light.png  (ghost-G mark, black, light mode)
 *
 * To replace the brand: swap the PNGs at the same paths. No code change.
 * ---------------------------------------------------------------
 */

import { cn } from "@/lib/utils";
import logoDark from "@/assets/brand/logo-dark.png";
import logoLight from "@/assets/brand/logo-light.png";
import iconDark from "@/assets/brand/icon-dark.png";
import iconLight from "@/assets/brand/icon-light.png";

// ---------------------------------------------------------------
// <LogoMark /> — ghost icon only
// ---------------------------------------------------------------

interface LogoMarkProps {
  height?: number;
  className?: string;
}

export function LogoMark({ height = 36, className }: LogoMarkProps) {
  return (
    <span
      className={cn("inline-block shrink-0", className)}
      style={{ height, width: height }}
      aria-label="GhostCode Dynamics"
      role="img"
    >
      <img
        src={iconLight}
        alt=""
        draggable={false}
        style={{ height, width: height }}
        className="block object-contain select-none dark:hidden"
      />
      <img
        src={iconDark}
        alt=""
        draggable={false}
        style={{ height, width: height }}
        className="hidden object-contain select-none dark:block"
      />
    </span>
  );
}

// ---------------------------------------------------------------
// <Logo /> — full horizontal lockup (ghost-G + hostCode / DYNAMICS)
// ---------------------------------------------------------------

interface LogoProps {
  className?: string;
  /** Rendered height in px. Defaults sized for navbar use. */
  height?: number;
  iconOnly?: boolean;
}

export function Logo({ className, height = 40, iconOnly = false }: LogoProps) {
  if (iconOnly) {
    return <LogoMark height={height} className={className} />;
  }
  return (
    <span
      className={cn(
        "inline-flex items-center transition-transform duration-300 ease-out group-hover:scale-[1.02]",
        className,
      )}
      aria-label="GhostCode Dynamics"
    >
      <img
        src={logoLight}
        alt="GhostCode Dynamics"
        draggable={false}
        style={{ height, width: "auto" }}
        className="block object-contain select-none dark:hidden"
      />
      <img
        src={logoDark}
        alt="GhostCode Dynamics"
        draggable={false}
        style={{ height, width: "auto" }}
        className="hidden object-contain select-none dark:block"
      />
    </span>
  );
}

// ---------------------------------------------------------------
// <LogoCompact /> — ghost icon + "GCD"
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

export { LogoMark as GhostIcon };
