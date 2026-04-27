import { createFileRoute, Link } from "@tanstack/react-router";
import { getPlayers } from "@/server/api";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Swords, Zap, Crosshair, Trophy, Target } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";

export const Route = createFileRoute("/compare")({
  loader: async () => {
    const players = await getPlayers();
    return { players };
  },
  component: ComparePlayers,
});

function ComparePlayers() {
  const { players } = Route.useLoaderData();
  const [p1Id, setP1Id] = useState(players[0]?.id);
  const [p2Id, setP2Id] = useState(players[1]?.id);

  const p1 = players.find((p: any) => p.id === p1Id);
  const p2 = players.find((p: any) => p.id === p2Id);

  const data = [
    { subject: 'F/D Ratio', A: p1?.kd * 20, B: p2?.kd * 20, fullMark: 150 },
    { subject: 'Accuracy', A: p1?.accuracy, B: p2?.accuracy, fullMark: 100 },
    { subject: 'Headshot %', A: p1?.headshot, B: p2?.headshot, fullMark: 100 },
    { subject: 'MVP Count', A: p1?.mvp * 4, B: p2?.mvp * 4, fullMark: 100 },
    { subject: 'Win Rate', A: p1?.winRate * 5, B: p2?.winRate * 5, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/team" className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Roster
        </Link>
        
        <header className="text-center mb-16">
          <div className="font-mono text-xs text-primary uppercase tracking-[0.4em] font-bold mb-4 flex items-center justify-center gap-2">
            <Swords className="h-4 w-4" /> Head to Head
          </div>
          <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase tracking-tighter drop-shadow-lg">
            Player Comparison
          </h1>
        </header>

        <div className="grid lg:grid-cols-[1fr_400px_1fr] gap-8 items-center mb-16">
          {/* Player 1 Selector */}
          <div className="glass p-6 rounded-3xl border border-primary/20 shadow-neon">
            <select 
              value={p1Id} 
              onChange={(e) => setP1Id(e.target.value)}
              className="w-full bg-background border border-primary/30 text-white rounded-xl p-4 font-display text-xl uppercase font-bold outline-none mb-6"
            >
              {players.map((p: any) => (
                <option key={p.id} value={p.id}>{p.ign}</option>
              ))}
            </select>
            {p1 && (
              <div className="text-center">
                <img src={p1.image} alt={p1.ign} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/30 shadow-[0_0_20px_rgba(var(--color-primary),0.3)] mb-4" />
                <h3 className="font-display text-3xl font-black text-white">{p1.ign}</h3>
                <div className="font-mono text-xs text-primary uppercase tracking-widest">{p1.role}</div>
              </div>
            )}
          </div>

          {/* Radar Chart */}
          <div className="h-[400px] w-full bg-background/50 rounded-full border border-white/5 relative p-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={p1?.ign} dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                <Radar name={p2?.ign} dataKey="B" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Player 2 Selector */}
          <div className="glass p-6 rounded-3xl border border-accent/20 shadow-[0_0_30px_rgba(var(--color-accent),0.1)]">
            <select 
              value={p2Id} 
              onChange={(e) => setP2Id(e.target.value)}
              className="w-full bg-background border border-accent/30 text-white rounded-xl p-4 font-display text-xl uppercase font-bold outline-none mb-6"
            >
              {players.map((p: any) => (
                <option key={p.id} value={p.id}>{p.ign}</option>
              ))}
            </select>
            {p2 && (
              <div className="text-center">
                <img src={p2.image} alt={p2.ign} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-accent/30 shadow-[0_0_20px_rgba(var(--color-accent),0.3)] mb-4" />
                <h3 className="font-display text-3xl font-black text-white">{p2.ign}</h3>
                <div className="font-mono text-xs text-accent uppercase tracking-widest">{p2.role}</div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Table */}
        <div className="glass rounded-3xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-white/5 p-4 border-b border-white/10 text-center font-mono text-xs text-gray-400 uppercase tracking-widest">
            <div>{p1?.ign}</div>
            <div>Metric</div>
            <div>{p2?.ign}</div>
          </div>
          {[
            { label: "F/D Ratio", k1: p1?.kd, k2: p2?.kd, icon: Target },
            { label: "Total Finishes", k1: p1?.finishes, k2: p2?.finishes, icon: Crosshair },
            { label: "Headshot %", k1: `${p1?.headshot}%`, k2: `${p2?.headshot}%`, icon: Zap },
            { label: "Accuracy", k1: `${p1?.accuracy}%`, k2: `${p2?.accuracy}%`, icon: Crosshair },
            { label: "Matches", k1: p1?.matches, k2: p2?.matches, icon: Swords },
            { label: "Win Rate", k1: `${p1?.winRate}%`, k2: `${p2?.winRate}%`, icon: Trophy },
          ].map((stat, i) => (
            <div key={stat.label} className={`grid grid-cols-3 p-6 text-center border-b border-white/5 items-center ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
              <div className={`font-display text-2xl font-bold ${stat.k1! > stat.k2! ? 'text-primary' : 'text-gray-400'}`}>{stat.k1}</div>
              <div className="flex flex-col items-center gap-2">
                <stat.icon className="h-4 w-4 text-gray-500" />
                <div className="text-xs font-mono uppercase tracking-widest text-white">{stat.label}</div>
              </div>
              <div className={`font-display text-2xl font-bold ${stat.k2! > stat.k1! ? 'text-accent' : 'text-gray-400'}`}>{stat.k2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
