import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, MessageCircle, Twitch } from "lucide-react";
import { ZodLogo } from "./zod-logo";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <ZodLogo />
          <p className="text-sm text-muted-foreground max-w-md">
            TEAM ZOD ESPORTS — a tier-1 Indian BGMI organization built on grit, comms, and clutch.
            Dominating the Battlegrounds since 2021.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Youtube, href: "#", label: "YouTube" },
              { Icon: Twitch, href: "#", label: "Twitch" },
              { Icon: MessageCircle, href: "#", label: "Discord" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="h-9 w-9 grid place-items-center rounded-md border border-border bg-card hover:border-primary hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-display font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/team" className="hover:text-foreground">Team</Link></li>
            <li><Link to="/tournaments" className="hover:text-foreground">Tournaments</Link></li>
            <li><Link to="/scrims" className="hover:text-foreground">Scrims</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/news" className="hover:text-foreground">News</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-display font-semibold mb-4">Stay Updated</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Join our newsletter for the latest news and tournament updates.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <Button size="sm" className="bg-primary text-primary-foreground h-auto py-1.5">
              Join
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} TEAM ZOD ESPORTS. All rights reserved.</p>
          <p className="tracking-widest">DOMINATING / THE / BATTLEGROUNDS</p>
        </div>
      </div>
    </footer>
  );
}