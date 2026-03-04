import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Signup local state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    const success = await login({ email: data.email, password: data.password });
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (signupName.trim().length < 2) errors.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) errors.email = "Please enter a valid email address";
    if (signupPassword.length < 6) errors.password = "Password must be at least 6 characters";
    if (signupPassword !== signupConfirm) errors.confirmPassword = "Passwords don't match";
    setSignupErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const success = await signup({
      email: signupEmail,
      password: signupPassword,
      name: signupName,
    });
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    loginForm.reset();
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirm("");
    setSignupErrors({});
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Auth Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-neon neon-glow-purple">
            <Zap className="h-8 w-8 text-background" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Gusion</h1>
          <p className="mt-2 text-muted-foreground">AI-Powered Online Judge</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="glass-card gradient-border p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Enter your credentials to continue"
                : "Sign up to start your coding journey"}
            </p>
          </div>

          {mode === "login" ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="border-glass-border bg-glass-bg/50 pl-10 pr-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="btn-neon w-full text-foreground" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="John Doe"
                    className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>
                {signupErrors.name && <p className="text-sm font-medium text-destructive">{signupErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="you@example.com"
                    className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                {signupErrors.email && <p className="text-sm font-medium text-destructive">{signupErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="border-glass-border bg-glass-bg/50 pl-10 pr-10 focus:border-primary focus:ring-primary"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signupErrors.password && <p className="text-sm font-medium text-destructive">{signupErrors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                  />
                </div>
                {signupErrors.confirmPassword && <p className="text-sm font-medium text-destructive">{signupErrors.confirmPassword}</p>}
              </div>

              <Button type="submit" className="btn-neon w-full text-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-primary hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
