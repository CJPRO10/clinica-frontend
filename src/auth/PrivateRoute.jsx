import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

export default function PrivateRoute({ children }) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Navigate to="/Login" />;
}
