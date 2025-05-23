import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      const { token, roles } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));

      if (roles.includes('ROLE_ADMIN')) {
        navigate('/dashboard/admin');
      } else if (roles.includes('ROLE_USER')) {
        navigate('/dashboard/user');
      }
    } catch (err) {
      console.error("Login fallo", err);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
      fontFamily: 'Segoe UI, sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>
          Iniciar Sesión en <span style={{ color: '#1565c0' }}>VitalMed</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1.5rem',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#43a047',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1565c0',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
