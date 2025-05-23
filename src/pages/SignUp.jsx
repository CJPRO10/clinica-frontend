// src/pages/SignUpPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: ['user'], // por defecto "user"
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', formData);
      alert('Cuenta creada correctamente');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />

        <button type="submit">Registrarse</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        ¿Ya tienes cuenta?{' '}
        <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
          Iniciar sesión
        </button>
      </p>
    </div>
  );
}

export default SignUpPage;
