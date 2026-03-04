import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const hasShownToast = useRef(false);

  const isAdmin = user?.role === "ADMIN";
  const shouldDenyAccess = adminOnly && isAuthenticated && !isAdmin;

  useEffect(() => {
    if (shouldDenyAccess && !hasShownToast.current) {
      hasShownToast.current = true;
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      });
    }
  }, [shouldDenyAccess, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (shouldDenyAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
