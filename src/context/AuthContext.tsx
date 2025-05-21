import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>("chidi"); // after testing set default user to null
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    // TODO: replace with real authentication logic
    if (username && password) {
      setUser(username);
      navigate("/dashboard");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
