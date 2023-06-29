import React, { createContext, useState, ReactNode } from "react";

interface User {
  // username: string;
  email: string;
  password: string;
}
interface CartItem {
  id: number;
  name: string;
  price: number;
}
interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize state with user information from local storage
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);
  const [user, setUser] = useState<User | null>(initialUser);
  

  

  const login = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUser({ email, password });
    localStorage.setItem("user", JSON.stringify({ email, password }));
  };

  const logout = () => {
    // Perform logout logic here, e.g., clearing user data
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};