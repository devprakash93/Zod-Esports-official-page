import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { submitTryout } from "@/server/api";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Tryouts — Join TEAM ZOD ESPORTS" },
      { name: "description", content: "Submit your tryout for TEAM ZOD ESPORTS. Open to BGMI players with serious tournament ambition." },
      { property: "og:title", content: "Join TEAM ZOD ESPORTS" },
      { property: "og:description", content: "Tryouts are open. Apply to join the ZOD roster." },
    ],
  }),
  component: JoinPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  ign: z.string().trim().min(2, "IGN is required").max(40),
  uid: z.string().trim().regex(/^\d{6,12}$/, "BGMI UID must be 6–12 digits"),
  kd: z.string().trim().regex(/^\d+(\.\d+)?$/, "Enter your KD (e.g. 4.2)"),
  experience: z.string().trim().min(10, "Tell us about your experience").max(800),
  contact: z.string().trim().min(5, "Contact required").max(120),
});

function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const issue of r.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await submitTryout({ data: r.data });
      setSubmitted(true);
      toast.success("Application received — Status: Under Review");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">Tryouts</div>
        <h1 className="font-display text-5xl sm:text-6xl font-bold">Join TEAM ZOD</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Tryouts are open. Submit your stats below — qualified players get an invite to our trial lobby.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="rounded-xl border border-primary/40 bg-card/60 p-10 text-center glow-soft">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
            <h2 className="mt-4 font-display text-2xl font-bold">Application Submitted</h2>
            <p className="mt-2 text-muted-foreground">
              Status: <span className="text-primary font-mono">UNDER REVIEW</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
              Our scouting team reviews tryouts within 7 business days. If shortlisted, you'll receive trial lobby details by email.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card/60 p-6 sm:p-10 grid sm:grid-cols-2 gap-5">
            <Field name="name" label="Full Name" error={errors.name} />
            <Field name="ign" label="In-game Name (IGN)" placeholder="ZOD•YOURNAME" error={errors.ign} />
            <Field name="uid" label="BGMI UID" placeholder="123456789" error={errors.uid} />
            <Field name="kd" label="Lifetime KD" placeholder="4.2" error={errors.kd} />
            <Field name="contact" label="Contact (Email or Discord)" className="sm:col-span-2" error={errors.contact} />
            <div className="sm:col-span-2">
              <Label htmlFor="experience">Tournament Experience</Label>
              <Textarea id="experience" name="experience" rows={5} placeholder="List leagues, tournaments, past teams, top placements..." className="mt-2 bg-background/60" maxLength={800} />
              {errors.experience && <p className="text-xs text-destructive mt-1">{errors.experience}</p>}
            </div>
            <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground font-mono">All applications reviewed within 7 days.</p>
              <Button type="submit" size="lg" disabled={loading} className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow-soft">
                {loading ? "Submitting..." : "Submit Tryout"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

function Field({ name, label, placeholder, error, className = "" }: { name: string; label: string; placeholder?: string; error?: string; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} placeholder={placeholder} className="mt-2 bg-background/60" maxLength={120} />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}