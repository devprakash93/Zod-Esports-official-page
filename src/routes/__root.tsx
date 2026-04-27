import * as React from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center p-8 glass rounded-3xl border border-destructive/50 shadow-neon">
          <h1 className="text-4xl font-display font-black text-destructive uppercase tracking-widest mb-4 drop-shadow-md">System Failure</h1>
          <p className="mt-2 text-sm text-gray-300 font-mono">
            {error.message || "An unexpected error occurred in the command center."}
          </p>
          <div className="mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center rounded-lg bg-destructive/20 hover:bg-destructive px-6 py-3 text-sm font-bold text-white uppercase tracking-widest transition-colors border border-destructive"
            >
              Restart System
            </button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

function NotFoundComponent() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-8xl font-display font-bold text-gradient">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Position not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This drop zone doesn't exist on the map. Rotate back to safe ground.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground glow-soft"
            >
              Return to base
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

function PendingComponent() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-deep text-white">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-r-2 border-accent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center font-display font-black text-xl">ZOD</div>
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary animate-pulse">Initializing System...</div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TEAM ZOD ESPORTS — Dominating the Battlegrounds" },
      { name: "description", content: "Tier-1 Indian BGMI esports organization. Roster, tournaments, scrims, news, tryouts and more from TEAM ZOD ESPORTS." },
      { name: "author", content: "TEAM ZOD ESPORTS" },
      { name: "theme-color", content: "#0b1230" },
      { property: "og:title", content: "TEAM ZOD ESPORTS" },
      { property: "og:description", content: "Dominating the Battlegrounds. Official site of TEAM ZOD ESPORTS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@TeamZodEsports" },
      { name: "twitter:creator", content: "@TeamZodEsports" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  pendingComponent: PendingComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname === "/login";

  if (isAdminRoute || isAuthRoute) {
    // Clean layout — no site chrome
    return <Outlet />;
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
