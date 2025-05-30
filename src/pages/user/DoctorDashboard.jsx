import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>👨‍⚕️ Panel del Doctor</h1>
        <p style={subtitleStyle}>Bienvenido, Doctor</p>

        <div style={buttonGroupStyle}>
          <button onClick={() => navigate('/dashboard/doctor/appointments')} style={navButtonStyle('#1976d2')}>
            📅 Ver Agenda
          </button>
          <button onClick={() => navigate('/dashboard/doctor/register-medical-record')} style={navButtonStyle('#388e3c')}>
            📝 Registrar Diagnóstico
          </button>
        </div>

        <button onClick={handleLogout} style={logoutButtonStyle}>
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  fontFamily: 'Segoe UI, sans-serif'
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center'
};

const titleStyle = {
  color: '#2e7d32',
  marginBottom: '0.5rem',
  fontSize: '1.8rem'
};

const subtitleStyle = {
  color: '#555',
  marginBottom: '2rem',
  fontSize: '1rem'
};

const buttonGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const navButtonStyle = (bgColor) => ({
  padding: '14px',
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: 'bold'
});

const logoutButtonStyle = {
  marginTop: '1.5rem',
  padding: '12px 20px',
  backgroundColor: '#d32f2f',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default DoctorDashboard;
