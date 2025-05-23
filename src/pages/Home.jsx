import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'linear-gradient(to right, #e8f5e9, #f1f8e9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#fff',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '1rem' }}>
          Bienvenido a <span style={{ color: '#1b5e20' }}>VitalMed</span>
        </h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Tu sistema de gestión clínica confiable y eficiente.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#43a047',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '6px',
            marginRight: '1rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate('/signup')}
          style={{
            backgroundColor: '#66bb6a',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  );
}

export default Home;
