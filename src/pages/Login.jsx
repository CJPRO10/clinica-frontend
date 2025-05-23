import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data);
      navigate('/dashboard');
    } catch (err) {
        console.error(err);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ marginBottom: '10px' }}>Entrar</button>
      </form>

      <div>
        <p>
          ¿No tienes cuenta?{' '}
          <button onClick={() => navigate('/signup')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
            Crear cuenta
          </button>
        </p>
        <p>
          <button onClick={() => alert('Función no implementada')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
            ¿Olvidaste tu contraseña?
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
