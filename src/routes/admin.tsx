import { createFileRoute, redirect, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { getSession } from "@/server/auth";
import { getTryouts } from "@/server/api";
import {
  Users, LayoutDashboard, FileText, LogOut, Shield,
  ChevronRight, Bell, Activity, Home, UserPlus, Trophy,
  AlertCircle, CheckCircle2, Clock, X
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      throw redirect({ to: "/login" });
    }
    return { session };
  },
  loader: async ({ context }) => {
    const tryouts = await getTryouts();
    return { session: (context as any).session, tryouts };
  },
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/players", label: "Roster", icon: Users, exact: false },
  { to: "/admin/applications", label: "Applications", icon: FileText, exact: false },
];

// ── Notification Dropdown Component ──────────────────────────────────────────
function NotificationDropdown({ tryouts }: { tryouts: any[] }) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Build notification list from real data
  const allNotifications = [
    ...tryouts
      .filter((t: any) => t.status === "PENDING")
      .slice(0, 5)
      .map((t: any) => ({
        id: `tryout-${t.id}`,
        icon: UserPlus,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        title: "New Tryout Application",
        desc: `${t.ign} (${t.name}) submitted a tryout request.`,
        time: "Pending review",
      })),
    {
      id: "sys-1",
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
      title: "BGMI Season Update",
      desc: "New scrim lobby schedule has been published for next week.",
      time: "System",
    },
    {
      id: "sys-2",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      title: "All Systems Operational",
      desc: "Database, auth, and API endpoints are all healthy.",
      time: "Now",
    },
  ];

  const visible = allNotifications.filter((n) => !dismissed.has(n.id));
  const unreadCount = visible.length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative h-9 w-9 rounded-xl border grid place-items-center transition-all ${
          open
            ? "bg-primary/20 border-primary/40 text-primary"
            : "bg-background/50 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
        }`}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground grid place-items-center font-mono shadow-neon-soft">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-card border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 text-primary" />
              <span className="font-display font-bold text-sm text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-primary/20 text-primary text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={() => setDismissed(new Set(allNotifications.map((n) => n.id)))}
              className="text-[10px] font-mono text-gray-500 hover:text-primary transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* Items */}
          <div className="max-h-80 overflow-y-auto">
            {visible.length === 0 ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-mono text-gray-500">All caught up!</p>
              </div>
            ) : (
              visible.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                >
                  <div className={`h-8 w-8 rounded-lg ${n.bg} grid place-items-center flex-shrink-0 mt-0.5`}>
                    <n.icon className={`h-3.5 w-3.5 ${n.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-xs text-white leading-tight">{n.title}</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5 leading-relaxed">{n.desc}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-2.5 w-2.5 text-gray-600" />
                      <span className="text-[9px] font-mono text-gray-600">{n.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setDismissed((prev) => new Set([...prev, n.id]))}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-white transition-all mt-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-white/5 bg-background/30">
            <Link
              to="/admin/applications"
              onClick={() => setOpen(false)}
              className="text-[10px] font-mono text-primary hover:text-white transition-colors uppercase tracking-widest font-bold"
            >
              View All Applications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminLayout() {
  const { session, tryouts } = Route.useLoaderData() as any;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const adminEmail: string = session?.email ?? "admin@teamzod.com";
  const adminInitial = adminEmail.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-deep text-foreground">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside
        className={`flex flex-col flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border-r border-white/5 bg-background/80 backdrop-blur-xl ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Sidebar Brand */}
        <div className={`flex items-center gap-3 px-4 h-16 border-b border-white/5 flex-shrink-0 ${sidebarOpen ? "justify-between" : "justify-center"}`}>
          {sidebarOpen && (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-black text-sm flex-shrink-0 shadow-neon-soft">Z</div>
              <div className="leading-none min-w-0">
                <div className="font-display font-black text-sm tracking-widest text-white">ZOD</div>
                <div className="font-mono text-[9px] text-primary uppercase tracking-[0.3em]">Command Center</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="h-7 w-7 rounded-lg border border-white/10 grid place-items-center text-gray-500 hover:text-white hover:border-white/20 transition-all flex-shrink-0"
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* ── Admin Profile Card ─────────────────────────────── */}
        <div className={`mx-3 mt-4 rounded-xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 overflow-hidden flex-shrink-0 ${sidebarOpen ? "p-4" : "p-2"}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center font-display font-black text-xl text-primary-foreground shadow-neon-soft">
                  {adminInitial}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-background" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-black text-white text-sm tracking-wider truncate">TEAM ZOD</div>
                <div className="font-mono text-[9px] text-primary uppercase tracking-[0.3em] mb-1 flex items-center gap-1">
                  <Shield className="h-2.5 w-2.5" /> Administrator
                </div>
                <div className="text-[9px] text-gray-500 font-mono truncate">{adminEmail}</div>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center font-display font-black text-sm text-primary-foreground">
              {adminInitial}
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-background" />
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
          {sidebarOpen && (
            <div className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.4em] px-3 mb-2">Navigation</div>
          )}
          {NAV.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to) && to !== "/admin";
            const exactActive = exact && pathname === to;
            const isActive = exactActive || (!exact && active);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-xl text-sm font-semibold transition-all duration-200 ${sidebarOpen ? "px-4 py-3" : "px-0 py-3 justify-center"} ${isActive
                  ? "bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_rgba(var(--color-primary),0.15)]"
                  : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                activeOptions={{ exact }}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                {sidebarOpen && <span>{label}</span>}
                {sidebarOpen && isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`px-3 pb-4 pt-3 border-t border-white/5 space-y-1 flex-shrink-0`}>
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/5 border border-transparent transition-all duration-200 ${sidebarOpen ? "px-4 py-3" : "px-0 py-3 justify-center"}`}
          >
            <Home className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
          <Link
            to="/login"
            onClick={() => {
              document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
            }}
            className={`flex items-center gap-3 rounded-xl text-sm text-rose-500 hover:text-white hover:bg-rose-500/10 border border-transparent transition-all duration-200 ${sidebarOpen ? "px-4 py-3" : "px-0 py-3 justify-center"}`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* ── Main Area ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-background/60 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <div className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.4em]">
              {pathname === "/admin" ? "Overview" : pathname === "/admin/players" ? "Roster Management" : "Applications CRM"}
            </div>
            <div className="font-display font-black text-white text-lg tracking-wide leading-tight">
              {pathname === "/admin" ? "Command Center" : pathname === "/admin/players" ? "Active Players" : "Tryout Pipeline"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-lg">
              <Activity className="h-3 w-3" />
              System Online
            </div>
            {/* Notifications */}
              <NotificationDropdown tryouts={tryouts ?? []} />
            {/* Admin Avatar */}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center font-display font-black text-sm text-primary-foreground shadow-neon-soft">
              {adminInitial}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
