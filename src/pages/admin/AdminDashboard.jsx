import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ color: '#2e7d32' }}>Panel de Administrador</h1>
      <p>Bienvenido al Dashboard de Administración.</p>

      <button
        onClick={() => navigate('/admin/doctors')}
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
