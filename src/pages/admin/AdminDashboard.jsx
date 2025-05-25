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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={() => handleLogout()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}  
        >
          Cerrar sesión
        </button>
      </div>
      <h1 style={{ color: '#2e7d32' }}>Panel de Administrador</h1>
      <p>Bienvenido al Dashboard de Administración.</p>

      <button
        onClick={() => navigate('/dashboard/admin/doctors')}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#1565c0',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Gestionar Doctores
      </button>
    </div>
  );
}

export default AdminDashboard;
