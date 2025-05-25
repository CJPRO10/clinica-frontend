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
import CreateDoctor from './pages/admin/DoctorCreate';
import EditDoctor from './pages/admin/DoctorEdit';
import ForgotPassword from './pages/ForgotPassword';
import PatientList from './pages/admin/PatientList';
import PatientEdit from './pages/admin/PatientEdit';
import PatientCreate from './pages/admin/PatientCreate';

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
        <Route
          path="/dashboard/admin/patients"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <PatientList />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/patients/new"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <PatientCreate />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/patients/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <PatientEdit />
              </RoleRoute>
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;

