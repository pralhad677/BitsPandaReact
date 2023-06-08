import React, { createContext, useState,useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  setAuthenticated: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);
interface A {
    children: React.ReactNode;
  }
  
export const AuthProvider: React.FC<A> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const handleSetAuthenticated = (value: boolean) => {
    setAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated:handleSetAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}; 
 
