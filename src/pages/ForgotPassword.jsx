// src/pages/ForgotPassword.jsx

import { useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/reset-password', { email, newPassword });
      toast.success('Contraseña actualizada con éxito');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar la contraseña');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to right, #f3e5f5, #e8f5e9)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#2e7d32' }}>Restablecer contraseña</h2>
        <input
          type="email"
          placeholder="Correo registrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Actualizar contraseña</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#43a047',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default ForgotPassword;
