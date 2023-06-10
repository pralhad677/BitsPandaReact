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
  const [isAuthenticated, setAuthenticated] = useState<boolean>(sessionStorage.getItem('token')!==null?true:false);
  
  
  
  const handleSetAuthenticated = (value: boolean) => {
    console.log('value',value)
    setAuthenticated(value);
  };
  React.useEffect(()=>{ 
  },[isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}; 
 
