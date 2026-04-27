import { useEffect, useState } from "react";
import { createFileRoute, Link, redirect, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getSession, logoutUser } from "@/server/auth";
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  Calendar, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  Target,
  Zap,
  ChevronRight,
  LogOut
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";

const mockPerformanceData = [
  { name: 'Mon', kills: 120, wins: 4 },
  { name: 'Tue', kills: 150, wins: 6 },
  { name: 'Wed', kills: 130, wins: 5 },
  { name: 'Thu', kills: 180, wins: 8 },
  { name: 'Fri', kills: 210, wins: 7 },
  { name: 'Sat', kills: 250, wins: 12 },
  { name: 'Sun', kills: 230, wins: 10 },
];

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
  },
  loader: async () => {
    const session = await getSession();
    // Fetch user specific stats here if needed
    return { session };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = Route.useLoaderData();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    // Clear the auth cookie client-side
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    await logoutUser();
    router.navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-bg-deep text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 glass-darker border-r border-border/40 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="font-display text-2xl font-bold tracking-tighter">
            ZOD<span className="text-primary">HUB</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "My Team" },
            { icon: Trophy, label: "Tournaments" },
            { icon: Calendar, label: "Schedule" },
            { icon: TrendingUp, label: "Analytics" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                item.active 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
          {session?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="p-4">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold">Commander Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {session?.email}. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search stats..." 
                className="w-full bg-card/40 border border-border/40 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Kills", value: "1,284", change: "+12%", icon: Target },
            { label: "Win Rate", value: "68%", change: "+5%", icon: Trophy },
            { label: "Avg. Placement", value: "3.2", change: "-0.5", icon: TrendingUp },
            { label: "Energy Level", value: "94%", change: "Optimal", icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/40 backdrop-blur border border-border/40 p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="h-12 w-12" />
              </div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-display font-bold">{stat.value}</p>
              <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-emerald-400' : stat.change === 'Optimal' ? 'text-primary' : 'text-rose-400'}`}>
                {stat.change} <span className="text-muted-foreground">vs last week</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-card/40 backdrop-blur border border-border/40 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold">Performance History</h3>
              <select className="bg-background/50 border border-border/40 rounded-md px-2 py-1 text-xs outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPerformanceData}>
                    <defs>
                      <linearGradient id="colorKills" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.3 0.06 260 / 20%)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'oklch(0.7 0.04 255)'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'oklch(0.7 0.04 255)'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'oklch(0.15 0.04 265)', border: '1px solid oklch(0.3 0.06 260 / 40%)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--color-primary)' }}
                    />
                    <Area type="monotone" dataKey="kills" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorKills)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/10 animate-pulse rounded-lg" />
              )}
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur border border-border/40 p-6 rounded-2xl">
            <h3 className="font-display font-bold mb-6">Upcoming Scrims</h3>
            <div className="space-y-4">
              {[
                { time: "18:00", name: "TIER-1 Practice", map: "Erangel" },
                { time: "20:00", name: "S8 Scrims", map: "Miramar" },
                { time: "22:00", name: "Internal Draft", map: "Sanhok" },
              ].map((scrim) => (
                <div key={scrim.time} className="flex items-center justify-between p-3 rounded-xl border border-border/20 bg-background/40 hover:bg-background/60 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg font-mono text-xs">
                      {scrim.time}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{scrim.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{scrim.map}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-primary hover:bg-primary/10 mt-2">
                View Full Schedule
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
