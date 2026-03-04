import { Link } from "react-router-dom";
import { Zap, Code, Brain, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-neon-purple/10 blur-[150px]" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-neon-cyan/10 blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-neon">
              <Zap className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold text-gradient">Gusion</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="btn-neon text-foreground">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="btn-neon text-foreground">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg/50 px-4 py-2 backdrop-blur-sm">
            <Brain className="h-4 w-4 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">AI-Powered Learning</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Master Algorithms with{" "}
            <span className="text-gradient">AI Guidance</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Gusion is an intelligent online judge that doesn't just tell you if your code is wrong
            — it helps you understand <span className="text-foreground">why</span> and{" "}
            <span className="text-foreground">how to fix it</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/auth">
              <Button size="lg" className="btn-neon min-w-[200px] text-foreground">
                Start Coding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-glass-border bg-glass-bg/50 hover:bg-glass-bg"
              >
                Browse Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="glass-card-hover p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neon-purple/20">
              <Code className="h-6 w-6 text-neon-purple" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Full IDE Experience</h3>
            <p className="text-muted-foreground">
              Write code in a professional Monaco editor with syntax highlighting, auto-completion,
              and support for Java, Python, JavaScript, C++, and more.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card-hover p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neon-cyan/20">
              <Brain className="h-6 w-6 text-neon-cyan" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Mentor</h3>
            <p className="text-muted-foreground">
              Get intelligent feedback on wrong answers. Our AI analyzes your code and provides
              hints without spoiling the solution.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card-hover p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neon-pink/20">
              <Trophy className="h-6 w-6 text-neon-pink" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Real-Time Verdicts</h3>
            <p className="text-muted-foreground">
              Watch your submission progress through compilation and testing with animated status
              updates and detailed results.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-bold text-gradient">Gusion</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gusion. AI-Powered Online Judge.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
