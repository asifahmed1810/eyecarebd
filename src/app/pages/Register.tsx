import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, Lock, Mail, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { apiRegister } from "../lib/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return name.trim().length >= 2 && email.trim().length > 3 && password.length >= 6 && agree;
  }, [name, email, password, agree]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await apiRegister({ name, email, password, role: "patient" });
      setSuccess("Account created! You can now sign in.");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            <CardTitle className="text-xl">Create account</CardTitle>
            <p className="text-sm text-white/70">Start your AI-powered eye health journey.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Full name
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>

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
                    placeholder="At least 6 characters"
                    className="pl-10"
                    autoComplete="new-password"
                  />
                </div>
              </div>

            

              <Button
                type="submit"
                disabled={!isValid || loading}
                className="w-full"
                style={{ backgroundColor: "#0052CC" }}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-emerald-300">
                {success}
              </p>
            )}

            <div className="text-sm text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-white underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-white/55">
          Tip: this is a UI-only demo. Hook it to your backend later.
        </p>
      </div>
    </div>
  );
}

