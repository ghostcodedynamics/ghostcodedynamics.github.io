import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

/**
 * GhostCode Dynamics brand mark.
 * The "G" of the wordmark is represented by the ghost-in-circle icon,
 * so the visible wordmark reads "hostCode / DYNAMICS".
 */
export function Logo({ className, iconOnly = false, size = 32 }: LogoProps) {
  return (
    <div
      className={cn("flex items-center gap-2.5", className)}
      aria-label="GhostCode Dynamics"
    >
      <GhostIcon size={size} />
      {!iconOnly && (
        <span className="flex flex-col leading-none font-display">
          <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
            hostCode
          </span>
          <span className="text-[0.6rem] font-medium tracking-[0.32em] text-muted-foreground mt-0.5">
            DYNAMICS
          </span>
        </span>
      )}
    </div>
  );
}

/**
 * Ghost-in-G mark. Uses currentColor so it inverts cleanly on light/dark
 * backgrounds without altering the original black / white / gray palette.
 */
export function GhostIcon({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 text-foreground", className)}
      role="img"
      aria-label="GhostCode Dynamics logo"
    >
      {/* Solid disc — uses currentColor so it adapts to theme */}
      <circle cx="32" cy="32" r="30" fill="currentColor" />

      {/* G opening on the right side (notch carved out of the disc) */}
      <path
        d="M44 28h-9v8h5v4a10 10 0 1 1-3-15"
        stroke="var(--background)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0"
      />

      {/* Ghost silhouette in the center, in the background color so it
          appears as a cut-out on both light and dark themes */}
      <path
        d="M32 16c-7 0-12 5-12 12v18c0 1.4 1.6 2.2 2.7 1.3l2.2-1.7c.6-.5 1.5-.5 2.1 0l2.2 1.7c.6.5 1.5.5 2.1 0l2.2-1.7c.6-.5 1.5-.5 2.1 0l2.2 1.7c1.1.9 2.7.1 2.7-1.3V28c0-7-5-12-12-12Z"
        fill="var(--background)"
      />

      {/* Soft gray tail/shadow on the ghost for the original 3-tone look */}
      <path
        d="M38 38c2.5 1.5 4.5 4 5 7-1 .5-2.5.4-3.6-.4L37 43.5V38Z"
        fill="currentColor"
        opacity="0.35"
      />

      {/* Eyes */}
      <circle cx="28.5" cy="29" r="1.8" fill="currentColor" />
      <circle cx="35.5" cy="29" r="1.8" fill="currentColor" />
    </svg>
  );
}
