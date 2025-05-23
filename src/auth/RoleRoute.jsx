import { Navigate } from 'react-router-dom';

export default function RoleRoute({ children, allowedRoles }) {
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  const hasAccess = roles.some(role => allowedRoles.includes(role));

  return hasAccess ? children : <Navigate to="/login" />;
}
