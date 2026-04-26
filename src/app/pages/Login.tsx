import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Eye, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useAuth } from "../auth/AuthContext";

type Role = "patient" | "doctor";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => email.trim().length > 3 && password.length >= 4, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    try {
      setLoading(true);
      setError(null);
      const user = await auth.login({ email, password });
      const userRole = user.role ?? role;
      const next = searchParams.get("next");
      if (next && next.startsWith("/")) {
        navigate(next);
      } else {
        navigate(userRole === "admin" ? "/admin" : userRole === "doctor" ? "/doctor" : "/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2 text-white/90">
          <Eye className="h-7 w-7" style={{ color: "#0052CC" }} />
          <span className="text-lg font-semibold tracking-tight">EyeCareBD</span>
        </div>

        <Card className="border-white/10">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl">Sign in</CardTitle>
            <p className="text-sm text-white/70">
              Secure access to your eye health tools.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border border-white/10 bg-white/5 p-1">
              <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
                <TabsList className="grid w-full grid-cols-2 bg-transparent">
                  <TabsTrigger value="patient" className="data-[state=active]:bg-white/10">
                    Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="data-[state=active]:bg-white/10">
                    Doctor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isValid || loading}
                className="w-full"
                style={{ backgroundColor: "#0052CC" }}
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-white/70">
              <span>
                New here?{" "}
                <Link to="/register" className="text-white underline underline-offset-4">
                  Create an account
                </Link>
              </span>
              <button
                type="button"
                className="text-white/80 underline underline-offset-4 hover:text-white"
                onClick={() => alert("Demo: password reset flow goes here.")}
              >
                Forgot password?
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-white/55">
          By signing in you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

