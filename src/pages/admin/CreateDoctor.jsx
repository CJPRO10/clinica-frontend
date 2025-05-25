// src/pages/admin/CreateDoctor.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    availableFrom: '',
    availableTo: '',
    password: ''
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
      await axios.post('/doctors/register-with-user', formData);
      toast.success('Doctor y usuario creados correctamente');
      setTimeout(() => {
        navigate('dashboard/admin/doctors');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear el doctor');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/dashboard/admin')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}  
        >
          Regresar
        </button>
      </div>
      <h2 style={{ color: '#1565c0' }}>Registrar Nuevo Doctor</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="specialty"
          placeholder="Especialidad"
          value={formData.specialty}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label>Disponible desde:</label>
        <input
          type="time"
          name="availableFrom"
          value={formData.availableFrom}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label>Disponible hasta:</label>
        <input
          type="time"
          name="availableTo"
          value={formData.availableTo}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Guardar Doctor
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#2e7d32',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default CreateDoctor;
