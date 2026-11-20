"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Store Admin";
  tier: string;
  avatarUrl: string;
  ordersCount: number;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: "Customer" | "Store Admin") => void;
  logout: () => void;
  switchRole: () => void;
}

const DEMO_CUSTOMER: UserSession = {
  id: "usr_cust_882",
  name: "Sophia Taylor",
  email: "sophia.taylor@apexstore.dev",
  role: "Customer",
  tier: "VIP Gold Member",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  ordersCount: 5,
};

const DEMO_ADMIN: UserSession = {
  id: "usr_admin_001",
  name: "Marcus Vance",
  email: "marcus.admin@apexstore.dev",
  role: "Store Admin",
  tier: "System Administrator",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  ordersCount: 142,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("apex_auth_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(DEMO_CUSTOMER);
      }
    } else {
      setUser(DEMO_CUSTOMER);
    }
  }, []);

  const login = (email: string, name?: string, role: "Customer" | "Store Admin" = "Customer") => {
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      tier: role === "Store Admin" ? "System Administrator" : "VIP Member",
      avatarUrl: DEMO_CUSTOMER.avatarUrl,
      ordersCount: 1,
    };
    setUser(newUser);
    localStorage.setItem("apex_auth_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("apex_auth_session");
  };

  const switchRole = () => {
    setUser((prev) => {
      const next = prev?.role === "Store Admin" ? DEMO_CUSTOMER : DEMO_ADMIN;
      localStorage.setItem("apex_auth_session", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
