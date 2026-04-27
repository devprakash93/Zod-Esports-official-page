import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Circle } from "lucide-react";
import { ZodLogo } from "./zod-logo";
import { Button } from "./ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/tournaments", label: "Tournaments" },
  { to: "/scrims", label: "Scrims" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const delta = y - lastY.current;
      // Only hide once we're past the hero edge, and only on real downward intent
      if (y > 120 && delta > 6) setHidden(true);
      else if (delta < -6 || y < 80) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "glass shadow-[0_8px_30px_-12px_oklch(0_0_0/0.6)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group" aria-label="TEAM ZOD ESPORTS home">
          <ZodLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground relative" }}
            >
              {n.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400 animate-pulse" />
            ONLINE
          </span>
          <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 glow-soft">
            <Link to="/join">Join Tryouts</Link>
          </Button>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 glass-darker">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                activeProps={{ className: "px-3 py-2 text-sm rounded-md bg-secondary/80 text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </Button>
              <Button asChild size="sm" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Link to="/join" onClick={() => setOpen(false)}>Join Tryouts</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}