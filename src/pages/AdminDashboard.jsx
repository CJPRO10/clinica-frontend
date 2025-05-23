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
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ color: '#1565c0' }}>Panel de Administración</h1>
      <p>Bienvenido, administrador. Aquí puedes gestionar doctores, pacientes, citas y más.</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#c62828',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default AdminDashboard;
