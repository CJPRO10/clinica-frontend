import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import SignUp from './pages/SignUp';
import RoleRoute from './auth/RoleRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorList from './pages/admin/DoctorList';
import CreateDoctor from './pages/admin/CreateDoctor';
import EditDoctor from './pages/admin/EditDoctor';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
        <Route
          path="/dashboard/admin/doctors"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <DoctorList />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/doctors/new"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <CreateDoctor />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/doctors/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <EditDoctor />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
        path='/forgot-password'
        element={
          <ForgotPassword />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;

