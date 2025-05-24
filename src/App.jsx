import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import SignUp from './pages/SignUp';
import RoleRoute from './auth/RoleRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorList from './pages/admin/DoctorList';
import DoctorForm from './pages/admin/CreateDoctor';

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
        <Route 
          path="/admin/doctors"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <DoctorList />
              </RoleRoute>
          </PrivateRoute>
          }
        />
        <Route 
          path="/admin/doctors/new"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <DoctorForm />
              </RoleRoute>
          </PrivateRoute>
          }
        />
        <Route 
          path="/admin/doctors/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                <DoctorForm />
              </RoleRoute>
          </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
