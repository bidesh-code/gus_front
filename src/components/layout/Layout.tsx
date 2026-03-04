import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Zap } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-neon">
              <Zap className="h-4 w-4 text-background" />
            </div>
            <span className="font-bold text-gradient">Gusion</span>
            <span className="text-sm text-muted-foreground">
              — AI-Powered Online Judge
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Documentation
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gusion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
