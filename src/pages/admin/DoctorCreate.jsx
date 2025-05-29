// src/pages/admin/CreateDoctor.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../styles/classes';

function DoctorCreate() {
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
    <div style={styles.containerStyle}>
      <ToastContainer />
      <div style={styles.cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/admin/doctors')} style={styles.backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={styles.titleStyle}>Registrar Nuevo Doctor</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text"  name="fullName" placeholder="Nombre completo" value={formData.fullName} onChange={handleChange} required style={styles.inputStyle} />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required style={styles.inputStyle} />
          <input type="text" name="specialty" placeholder="Especialidad" value={formData.specialty} onChange={handleChange} required style={styles.inputStyle} />
          <label style={styles.labelStyle}>Disponible desde:</label>
          <input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required style={styles.inputStyle} />
          <label style={styles.labelStyle}>Disponible hasta:</label>
          <input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange} required style={styles.inputStyle} />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={styles.inputStyle} />
          <button type="submit" style={styles.submitButtonStyle}>Guardar Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorCreate;
