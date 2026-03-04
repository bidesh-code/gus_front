import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Zap, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // For dev access - check role or allow all for development
  const isAdmin = user?.role === "ADMIN" || true;

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-neon">
            <Zap className="h-5 w-5 text-background" />
          </div>
          <span className="text-xl font-bold text-gradient">Gusion</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary neon-glow-purple" />
              )}
            </Link>
          ))}
          
          {/* Admin Link */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/admin")
                  ? "text-neon-purple"
                  : "text-muted-foreground hover:text-neon-purple"
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin
              {isActive("/admin") && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-neon-purple" />
              )}
            </Link>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-primary/50 transition-all hover:ring-primary"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name || user?.email} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-glass-border">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name || "User"}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button className="btn-neon text-foreground">Sign In</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 glass-card border-l-glass-border">
            <div className="flex flex-col gap-6 pt-8">
              {/* Mobile User Info */}
              {isAuthenticated && (
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name || "User"}</span>
                    <span className="text-sm text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
              )}

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Admin Link */}
                {isAuthenticated && isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive("/admin")
                        ? "bg-neon-purple/10 text-neon-purple"
                        : "text-muted-foreground hover:bg-muted hover:text-neon-purple"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
              </div>

              {/* Mobile Auth Actions */}
              <div className="mt-auto flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-destructive hover:text-destructive"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="btn-neon w-full text-foreground">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
