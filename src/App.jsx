import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/userdashboard" element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
