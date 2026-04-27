import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getTryouts, updateTryoutStatus } from "@/server/api";
import { Search, CheckCircle, XCircle, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/applications")({
  loader: async () => {
    const tryouts = await getTryouts();
    return { tryouts };
  },
  component: AdminApplications,
});

function AdminApplications() {
  const { tryouts } = Route.useLoaderData();
  const router = useRouter();

  const handleStatusChange = async (id: string, status: string) => {
    await updateTryoutStatus({ data: { id, status } });
    router.invalidate();
  };

  return (
    <div className="p-6 sm:p-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] font-bold mb-2">Recruitment CRM</div>
          <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight">Applications</h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search UID or IGN..." 
              className="w-full bg-card/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-primary transition-all text-white"
            />
          </div>
        </div>
      </header>

      <div className="bg-card/40 backdrop-blur border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/40 border-b border-white/5 font-mono uppercase tracking-widest text-[10px] text-gray-500">
              <tr>
                <th className="px-6 py-4">Player</th>
                <th className="px-6 py-4">Stats</th>
                <th className="px-6 py-4">Device / Exp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tryouts.map((t: any) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-display font-bold text-lg text-white">{t.ign}</div>
                    <div className="text-xs text-gray-400 font-mono">UID: {t.uid}</div>
                    <div className="text-xs text-gray-500 mt-1">{t.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-primary text-lg">{t.kd} KD</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300 font-medium mb-1">{t.device}</div>
                    <div className="text-xs text-gray-500 max-w-[200px] truncate">{t.experience}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center text-xs font-mono font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                      t.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      t.status === 'SHORTLISTED' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      t.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {t.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleStatusChange(t.id, "SHORTLISTED")} variant="ghost" size="icon" title="Shortlist" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleStatusChange(t.id, "ACCEPTED")} variant="ghost" size="icon" title="Accept" className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleStatusChange(t.id, "REJECTED")} variant="ghost" size="icon" title="Reject" className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-400/10">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {tryouts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
