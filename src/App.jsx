import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import SignUp from './pages/SignUp';
import RoleRoute from './auth/RoleRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route 
          path="/dashboard/user" 
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_USER']}>
                <UserDashboard />
              </RoleRoute>
          </PrivateRoute>
          }
        />
        <Route 
          path="/dashboard/admin" 
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <AdminDashboard />
              </RoleRoute>
          </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
