import { createFileRoute } from "@tanstack/react-router";
import { getPlayers, getTryouts, getTournaments } from "@/server/api";
import { Users, FileText, Trophy, Activity, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [players, tryouts, tournaments] = await Promise.all([
      getPlayers(),
      getTryouts(),
      getTournaments()
    ]);
    return { players, tryouts, tournaments };
  },
  component: AdminOverview,
});

function AdminOverview() {
  const { players, tryouts, tournaments } = Route.useLoaderData();

  const pendingTryouts = tryouts.filter((t: any) => t.status === "PENDING").length;

  return (
    <div className="p-6 sm:p-10">
      <header className="mb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] font-bold mb-2">Command Center</div>
        <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight">Overview Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Active Players", value: players.length, Icon: Users, color: "text-blue-400" },
          { label: "Pending Tryouts", value: pendingTryouts, Icon: FileText, color: "text-amber-400" },
          { label: "Tournaments Won", value: tournaments.filter((t:any) => t.status==="won").length, Icon: Trophy, color: "text-emerald-400" },
          { label: "System Status", value: "Online", Icon: Activity, color: "text-primary" },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-background/50 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">Recent Applications</h2>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </div>
          <div className="space-y-4">
            {tryouts.slice(0, 5).map((t: any) => (
              <div key={t.id} className="flex items-center justify-between p-4 rounded-xl bg-background/40 border border-white/5">
                <div>
                  <div className="font-bold text-white">{t.ign}</div>
                  <div className="text-xs text-gray-400">{t.name}</div>
                </div>
                <div className={`text-xs font-mono font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  t.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' :
                  t.status === 'SHORTLISTED' ? 'bg-blue-500/10 text-blue-500' :
                  t.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500' :
                  'bg-rose-500/10 text-rose-500'
                }`}>
                  {t.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">Active Roster</h2>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </div>
          <div className="space-y-4">
            {players.slice(0, 5).map((p: any) => (
              <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-white/5">
                <img src={p.image} alt={p.ign} className="w-10 h-10 rounded-full object-cover grayscale" />
                <div className="flex-1">
                  <div className="font-bold text-white">{p.ign}</div>
                  <div className="text-xs font-mono text-primary uppercase tracking-widest">{p.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{p.kd} KD</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
