import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiMe, setAuthToken } from "../lib/api";

export type Role = "patient" | "doctor" | "admin";

export type AuthUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
};

type AuthState = {
  ready: boolean;
  user: AuthUser | null;
  login: (input: { email: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
  refresh: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const refresh = useCallback(async () => {
    try {
      const me = await apiMe();
      setUser(me.user ?? null);
      return me.user ?? null;
    } catch {
      setAuthToken(null);
      setUser(null);
      return null;
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (input: { email: string; password: string }) => {
    const result = await apiLogin(input);
    setAuthToken(result.token);
    const me = await apiMe();
    setUser(me.user ?? null);
    return me.user ?? result.user;
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(() => ({ ready, user, login, logout, refresh }), [ready, user, login, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

