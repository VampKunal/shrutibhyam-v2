import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { authenticateWithGoogle, logoutUser, getCurrentUser } from "@/lib/api/auth.functions";

export interface UserProfile {
  id: number;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (idToken: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isLoginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginOpen, setLoginOpen] = useState(false);

  // Function to check if a user is logged in
  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Error fetching current user session:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch current user session on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Auto prompt login if not logged in
  useEffect(() => {
    if (!isLoading && user === null) {
      const hasPrompted = sessionStorage.getItem("loginPrompted");
      if (!hasPrompted) {
        const timer = setTimeout(() => {
          setLoginOpen(true);
          sessionStorage.setItem("loginPrompted", "true");
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, user]);

  // Login handler
  const login = useCallback(async (idToken: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authenticateWithGoogle({ data: { idToken } });
      if (result && result.success) {
        setUser(result.user);
        return true;
      }
      setError("Authentication failed: invalid server response");
      return false;
    } catch (err: any) {
      const message = err?.message || "An unexpected error occurred during sign-in";
      setError(message);
      console.error("Login failure:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout handler
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failure:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        refreshUser,
        isLoginOpen,
        setLoginOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
