import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Error 404</p>
        <h1 className="mt-3 font-display text-6xl font-semibold text-gradient">Lost in the void</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has drifted somewhere else. Let's get you back on track.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Something glitched in the matrix
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You can try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GhostCode Dynamics — Building Digital Solutions" },
      {
        name: "description",
        content:
          "GhostCode Dynamics is a founder-led technology brand building digital solutions for businesses and empowering the next generation of tech professionals.",
      },
      { name: "author", content: "GhostCode Dynamics" },
      { name: "theme-color", content: "#0a0a12" },
      { property: "og:site_name", content: "GhostCode Dynamics" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "GhostCode Dynamics" },
      {
        property: "og:description",
        content:
          "Building digital solutions for businesses while empowering the next generation of tech professionals.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GhostCode Dynamics" },
      {
        name: "twitter:description",
        content:
          "Building digital solutions for businesses while empowering the next generation of tech professionals.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/* Apply stored theme before paint to avoid flash */}
        <ScriptOnce
          children={`(() => { try { const t = localStorage.getItem('ghostcode-theme'); const isDark = t ? t === 'dark' : true; document.documentElement.classList.toggle('dark', isDark); document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'; } catch(e){} })();`}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="relative flex min-h-dvh flex-col">
          <SiteNav />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
