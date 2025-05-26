import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Botón de regreso */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>logout</span>
          Logout
        </button>
      </div>

        {/* Título */}
        <h1 style={titleStyle}>👨‍⚕️ Panel de Administrador</h1>
        <p style={subtitleStyle}>Bienvenido al Dashboard de Administración</p>

        {/* Botones de navegación */}
        <div style={buttonGroupStyle}>
          <button onClick={() => navigate('/dashboard/admin/doctors')} style={navButtonStyle('#1565c0')}>
            <span className="material-icons" style={iconStyle}>medical_services</span>
            Gestionar Doctores
          </button>
          <button onClick={() => navigate('/dashboard/admin/patients')} style={navButtonStyle('#0288d1')}>
            <span className="material-icons" style={iconStyle}>groups</span>
            Gestionar Pacientes
          </button>
          <button onClick={() => navigate('/dashboard/admin/appointments')} style={navButtonStyle('#0288d1')}>
            <span className="material-icons" style={iconStyle}>event</span>
            Gestionar Citas
          </button>
          <button onClick={() => navigate('/dashboard/admin/rooms')} style={navButtonStyle('#0288d1')}>
            <span className="material-icons" style={iconStyle}>hotel</span>
            Gestionar Consultorios
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 Estilos
const containerStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  padding: '2rem',
  boxSizing: 'border-box'
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px',
  position: 'relative',
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
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  transition: 'background-color 0.3s ease'
});

const iconStyle = {
  fontSize: '20px',
  verticalAlign: 'middle'
};

export default AdminDashboard;
