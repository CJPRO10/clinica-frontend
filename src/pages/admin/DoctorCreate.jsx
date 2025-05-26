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
        navigate('/dashboard/admin/doctors');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear el doctor');
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/admin/doctors')} style={backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={titleStyle}>Registrar Nuevo Doctor</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Nombre completo" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="specialty" placeholder="Especialidad" value={formData.specialty} onChange={handleChange} required style={inputStyle} />
          <label style={labelStyle}>Disponible desde:</label>
          <input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required style={inputStyle} />
          <label style={labelStyle}>Disponible hasta:</label>
          <input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={submitButtonStyle}>Guardar Doctor</button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Estilos
const containerStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif'
};

const cardStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px',
  boxSizing: 'border-box'
};

const titleStyle = {
  color: '#1565c0',
  marginBottom: '1.5rem'
};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2e7d32',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease'
};

const backButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#d32f2f',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

export default CreateDoctor;
