import * as Auth from "@/lib/_core/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  autoFetch?: boolean;
};

/**
 * useAuth hook - App is fully public, no authentication required
 * This hook is kept for compatibility but always returns null user
 */
export function useAuth(options?: UseAuthOptions) {
  const { autoFetch = true } = options ?? {};
  const [user, setUser] = useState<Auth.User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    console.log("[useAuth] App is fully public - no user authentication");
    setLoading(false);
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      // App is fully public - just clear local state
      await Auth.removeSessionToken();
      await Auth.clearUserInfo();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("[Auth] Logout failed:", err);
    }
  }, []);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  useEffect(() => {
    console.log("[useAuth] useEffect triggered - app is fully public");
    if (autoFetch) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [autoFetch, fetchUser]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    refresh: fetchUser,
    logout,
  };
}
