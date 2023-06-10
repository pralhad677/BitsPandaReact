import { Navigate } from "react-router-dom"; 
import { AuthContext } from "./AuthProvider";
import {useContext} from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
 

