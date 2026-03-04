import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, UserProfile, LoginRequest, SignupRequest, ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<boolean>;
  signup: (data: SignupRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  TOKEN: "gusion_token",
  USER: "gusion_user",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Invalid stored user, clear storage
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setIsLoading(false);
  }, []);

  const persistAuth = useCallback((authToken: string, authUser: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (data: LoginRequest): Promise<boolean> => {
      try {
        setIsLoading(true);
        const response = await authApi.login(data);
        persistAuth(response.token, response.user);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${response.user.email}`,
        });
        return true;
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Login failed. Please try again.";
        toast({
          title: "Login Failed",
          description: message,
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth, toast]
  );

  const signup = useCallback(
    async (data: SignupRequest): Promise<boolean> => {
      try {
        setIsLoading(true);
        const response = await authApi.signup(data);
        persistAuth(response.token, response.user);
        toast({
          title: "Account Created!",
          description: "Welcome to Gusion. Let's start coding!",
        });
        return true;
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Signup failed. Please try again.";
        toast({
          title: "Signup Failed",
          description: message,
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth, toast]
  );

  const logout = useCallback(() => {
    clearAuth();
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  }, [clearAuth, toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
