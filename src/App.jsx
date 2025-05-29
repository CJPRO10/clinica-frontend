import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home';
import Login from './pages/Login';
import DoctorDashboard from './pages/user/DoctorDashboard';
import PrivateRoute from './auth/PrivateRoute';
import SignUp from './pages/SignUp';
import RoleRoute from './auth/RoleRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorList from './pages/admin/DoctorList';
import ForgotPassword from './pages/ForgotPassword';
import PatientList from './pages/admin/PatientList';
import PatientEdit from './pages/admin/PatientEdit';
import PatientCreate from './pages/admin/PatientCreate';
import AppointmentList from './pages/admin/AppointmentList';
import AppointmentCreate from './pages/admin/AppointmentCreate';
import AppointmentEdit from './pages/admin/AppointmentEdit';
import ConsultRoomCreate from './pages/admin/ConsultRoomCreate';
import ConsultRoomList from './pages/admin/ConsultRoomList';
import ConsultRoomEdit from './pages/admin/ConsultRoomEdit';
import DoctorAppointments from './pages/user/DoctorAppointments';
import RegisterMedicalRecord from './pages/user/MedicalRecordRegister';
import DoctorEdit from './pages/admin/DoctorEdit';
import DoctorCreate from './pages/admin/DoctorCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/doctor"
          element={  
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_USER']}>
                <DoctorDashboard />
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
                <DoctorCreate />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/doctors/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <DoctorEdit />
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
        <Route
          path="/dashboard/admin/appointments"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <AppointmentList />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/appointments/new"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <AppointmentCreate />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/appointments/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <AppointmentEdit />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/rooms"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <ConsultRoomList />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/rooms/new"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <ConsultRoomCreate />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/rooms/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <ConsultRoomEdit />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard/doctor/appointments'
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_USER']}>
                <DoctorAppointments />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard/doctor/register-medical-record'
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_USER']}>
                <RegisterMedicalRecord />
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

