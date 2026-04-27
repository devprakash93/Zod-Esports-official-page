import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getPlayers, upsertPlayer, deletePlayer } from "@/server/api";
import { useState } from "react";
import { Search, Edit2, Trash2, Plus, X, Save, Loader2, UserCheck, UserX, Shield, Target, Crosshair, Star, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/players")({
  loader: async () => {
    const players = await getPlayers();
    return { players };
  },
  component: AdminPlayers,
});

const EMPTY_FORM = {
  id: "",
  name: "", ign: "", role: "IGL", image: "",
  kd: 0, finishes: 0, accuracy: 0, headshot: 0,
  matches: 0, winRate: 0, mvp: 0, status: "active",
  insta: "", yt: "",
};

const ROLES = ["IGL", "Assaulter", "Sniper", "Support", "Entry Fragger", "Coach"];
const IMAGE_PRESETS = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
];

function PlayerModal({
  form, setForm, onClose, onSave, saving,
}: {
  form: typeof EMPTY_FORM;
  setForm: (f: typeof EMPTY_FORM) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  const isEdit = !!form.id;
  const Field = ({ label, field, type = "text", step }: { label: string; field: keyof typeof EMPTY_FORM; type?: string; step?: string }) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold">{label}</label>
      <input
        type={type}
        step={step}
        value={form[field] as any}
        onChange={(e) => setForm({ ...form, [field]: type === "number" ? parseFloat(e.target.value) || 0 : e.target.value })}
        className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-card border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-background/50 flex-shrink-0">
          <div>
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] font-bold mb-1">
              {isEdit ? "Edit Player" : "New Player"}
            </div>
            <h2 className="font-display text-2xl font-black text-white uppercase">
              {isEdit ? form.ign || "Edit Player" : "Add to Roster"}
            </h2>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full border border-white/10 bg-background/50 grid place-items-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-8 space-y-6 flex-1">
          {/* Image Preview */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-28 rounded-xl overflow-hidden border border-white/10 bg-background flex-shrink-0">
              {form.image ? (
                <img src={form.image} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-gray-600 text-xs font-mono">No Image</div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://... or pick a preset"
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
              />
              <div className="flex gap-2 flex-wrap mt-2">
                {IMAGE_PRESETS.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setForm({ ...form, image: url })}
                    className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${form.image === url ? "border-primary shadow-neon-soft" : "border-white/10 hover:border-white/30"}`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Real Name" field="name" />
            <Field label="IGN (In-Game Name)" field="ign" />
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              >
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              >
                <option value="active">Active</option>
                <option value="past">Past / Alumni</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold mb-3">Performance Stats</div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="K/D Ratio" field="kd" type="number" step="0.01" />
              <Field label="Total Kills" field="finishes" type="number" />
              <Field label="Accuracy %" field="accuracy" type="number" step="0.1" />
              <Field label="Headshot %" field="headshot" type="number" step="0.1" />
              <Field label="Matches Played" field="matches" type="number" />
              <Field label="Win Rate %" field="winRate" type="number" step="0.1" />
              <Field label="MVP Count" field="mvp" type="number" />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold mb-3">Social Links</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold flex items-center gap-1.5"><Instagram className="h-3 w-3" /> Instagram URL</label>
                <input type="text" value={form.insta || ""} onChange={(e) => setForm({ ...form, insta: e.target.value })} placeholder="https://instagram.com/..." className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-bold flex items-center gap-1.5"><Youtube className="h-3 w-3" /> YouTube URL</label>
                <input type="text" value={form.yt || ""} onChange={(e) => setForm({ ...form, yt: e.target.value })} placeholder="https://youtube.com/..." className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-white/10 bg-background/30 flex-shrink-0">
          <Button onClick={onClose} variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300">Cancel</Button>
          <Button
            onClick={onSave}
            disabled={saving || !form.name || !form.ign || !form.image}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 min-w-[140px]"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Player"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdminPlayers() {
  const router = useRouter();
  const { players } = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filtered = Array.isArray(players)
    ? players.filter((p: any) =>
        p.ign.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.role.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const openAdd = () => {
    setForm({ ...EMPTY_FORM });
    setError("");
    setModal("add");
  };

  const openEdit = (p: any) => {
    setForm({
      id: p.id, name: p.name, ign: p.ign, role: p.role, image: p.image,
      kd: p.kd, finishes: p.finishes, accuracy: p.accuracy, headshot: p.headshot,
      matches: p.matches, winRate: p.winRate, mvp: p.mvp, status: p.status,
      insta: p.insta || "", yt: p.yt || "",
    });
    setError("");
    setModal("edit");
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.ign.trim() || !form.image.trim()) {
      setError("Name, IGN, and Image are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await upsertPlayer({
        data: {
          ...(form.id ? { id: form.id } : {}),
          name: form.name, ign: form.ign, role: form.role, image: form.image,
          kd: form.kd, finishes: form.finishes, accuracy: form.accuracy, headshot: form.headshot,
          matches: form.matches, winRate: form.winRate, mvp: form.mvp, status: form.status,
          insta: form.insta || undefined, yt: form.yt || undefined,
        },
      });
      setModal(null);
      router.invalidate(); // Refresh loader data
    } catch (e: any) {
      setError(e.message || "Failed to save player.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, ign: string) => {
    if (!confirm(`Remove ${ign} from the roster? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deletePlayer({ data: id });
      router.invalidate();
    } catch (e: any) {
      alert("Failed to delete: " + e.message);
    } finally {
      setDeletingId(null);
    }
  };

  const activeCount = filtered.filter((p: any) => p.status === "active").length;
  const pastCount = filtered.filter((p: any) => p.status === "past").length;

  return (
    <div className="p-6 sm:p-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] font-bold mb-2">Roster Management</div>
          <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight">Active Players</h1>
          <div className="flex gap-4 mt-2 text-xs font-mono text-gray-500">
            <span><span className="text-emerald-400 font-bold">{activeCount}</span> Active</span>
            <span><span className="text-gray-400 font-bold">{pastCount}</span> Alumni</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-primary transition-all text-white"
            />
          </div>
          <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-bold whitespace-nowrap">
            <Plus className="h-4 w-4" /> Add Player
          </Button>
        </div>
      </header>

      {/* Error banner */}
      {error && modal && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-mono">{error}</div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-600 font-mono">
          {search ? `No players matching "${search}"` : "No players yet. Add one above."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p: any) => (
            <div key={p.id} className="glass rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/30 transition-all duration-300 shadow-card">
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden bg-black/50">
                <img
                  src={p.image}
                  alt={p.ign}
                  className="w-full h-full object-cover grayscale-[60%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${p.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"}`}>
                    {p.status === "active" ? <UserCheck className="h-2.5 w-2.5" /> : <UserX className="h-2.5 w-2.5" />}
                    {p.status}
                  </span>
                </div>

                {/* Action Buttons (hover) */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => openEdit(p)}
                    className="h-8 w-8 rounded-lg bg-black/70 backdrop-blur border border-white/20 hover:bg-primary/30 hover:border-primary text-white grid place-items-center transition-all"
                    title="Edit player"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.ign)}
                    disabled={deletingId === p.id}
                    className="h-8 w-8 rounded-lg bg-black/70 backdrop-blur border border-rose-500/30 hover:bg-rose-500/30 hover:border-rose-500 text-rose-400 grid place-items-center transition-all disabled:opacity-50"
                    title="Remove player"
                  >
                    {deletingId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Player Name */}
                <div className="absolute bottom-3 left-4">
                  <div className="font-mono text-[9px] text-primary font-bold tracking-[0.3em] mb-0.5">{p.role.toUpperCase()}</div>
                  <div className="font-display text-xl font-black text-white leading-none">{p.ign}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{p.name}</div>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="p-4 grid grid-cols-4 gap-3 border-t border-white/5 bg-background/40">
                <div className="text-center">
                  <div className="flex justify-center mb-1"><Target className="h-3 w-3 text-primary" /></div>
                  <div className="font-bold text-white text-sm leading-none">{p.kd}</div>
                  <div className="text-[8px] font-mono text-gray-600 uppercase mt-0.5">K/D</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1"><Crosshair className="h-3 w-3 text-accent" /></div>
                  <div className="font-bold text-white text-sm leading-none">{p.headshot}%</div>
                  <div className="text-[8px] font-mono text-gray-600 uppercase mt-0.5">HS%</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1"><Shield className="h-3 w-3 text-emerald-400" /></div>
                  <div className="font-bold text-white text-sm leading-none">{p.matches}</div>
                  <div className="text-[8px] font-mono text-gray-600 uppercase mt-0.5">Games</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1"><Star className="h-3 w-3 text-yellow-400" /></div>
                  <div className="font-bold text-white text-sm leading-none">{p.mvp}</div>
                  <div className="text-[8px] font-mono text-gray-600 uppercase mt-0.5">MVP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <PlayerModal
          form={form}
          setForm={setForm}
          onClose={() => { setModal(null); setError(""); }}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
