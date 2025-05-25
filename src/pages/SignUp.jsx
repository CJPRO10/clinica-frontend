import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
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
      toast.success('Cuenta creada correctamente');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrarse');
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
          Crear Cuenta en <span style={{ color: '#1565c0' }}>VitalMed</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '1rem',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            Registrarse
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1565c0',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
