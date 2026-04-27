import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowLeft, Mail, Lock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZodLogo } from "@/components/zod-logo";
import { loginUser } from "@/server/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await loginUser({ data: { email, password } });
      // Store auth token as a browser cookie (1 day expiry)
      const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
      document.cookie = `auth_token=${result.token}; path=/; expires=${expires}; SameSite=Lax`;
      if (result.role === "ADMIN") {
        router.navigate({ to: "/admin" });
      } else {
        router.navigate({ to: "/" });
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setEmail("admin@teamzod.com");
    setPassword("password123");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden bg-bg-deep">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>

      <div className="hidden lg:flex flex-col justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="mb-8">
            <ZodLogo />
          </div>
          <h1 className="text-5xl font-display font-bold leading-tight mb-6">
            WELCOME TO THE <br />
            <span className="text-gradient glow-text">COMMAND CENTER</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-8">
            Access your stats, manage your roster, and track your performance in real-time.
          </p>
          <div className="space-y-4">
            {[
              "Real-time Performance Analytics",
              "Roster Management Tools",
              "Exclusive Tournament Access",
              "Professional Scrim Logs",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-mono">
                <ShieldCheck className="h-4 w-4 text-primary" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-12 lg:p-20 bg-card/40 backdrop-blur-md border-l border-border/40 relative z-10">
        <Link to="/" className="absolute top-8 left-8 text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to base
        </Link>

        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <div className="mb-10 lg:hidden">
            <ZodLogo />
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold mb-2">Login</h2>
            <p className="text-muted-foreground">Enter your credentials to access the hub.</p>
          </div>

          <div className="mb-6 p-4 rounded-xl border border-primary/30 bg-primary/10 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-semibold mb-1">Demo Credentials</p>
              <p className="text-xs text-muted-foreground font-mono mb-2">Email: admin@teamzod.com<br />Pass: password123</p>
              <button type="button" onClick={autofillDemo} className="text-xs text-primary hover:underline font-semibold uppercase tracking-wider">
                Autofill Admin
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@teamzod.com"
                  className="w-full bg-background/50 border border-border rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Password</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background/50 border border-border rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive font-semibold border-l-2 border-destructive pl-2">{error}</p>}

            <Button disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground h-12 text-md font-semibold glow-soft transition-transform active:scale-[0.98]">
              {loading ? "Authenticating..." : "Access Hub"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New here? <Link to="/join" className="text-primary hover:underline font-semibold">Apply for tryouts</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
