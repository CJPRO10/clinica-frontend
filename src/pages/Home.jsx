import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '3rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '480px',
        width: '100%',
        transition: 'transform 0.3s ease',
      }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '1rem', fontSize: '2rem' }}>
          Bienvenido a <span style={{ color: '#1b5e20' }}>VitalMed</span>
        </h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#555' }}>
          Tu sistema de gestión clínica confiable y eficiente.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#43a047',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#388e3c'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#43a047'}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
