import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../styles/classes';

function DoctorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    availableFrom: '',
    availableTo: ''
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/doctors/${id}`);
        const doctor = res.data;
        setFormData({
          fullName: doctor.fullName || '',
          email: doctor.email || '',
          specialty: doctor.specialty || '',
          availableFrom: doctor.availableFrom || '',
          availableTo: doctor.availableTo || ''
        });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al cargar los datos del doctor');
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/doctors/${id}`, formData);
      toast.success('Doctor actualizado correctamente');
      setTimeout(() => {
        navigate('/dashboard/admin/doctors');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar el doctor');
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
          <h2 style={styles.titleStyle}>Editar Doctor</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Nombre completo" value={formData.fullName} onChange={handleChange} required style={styles.inputStyle} />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required style={styles.inputStyle} />
          <input type="text" name="specialty" placeholder="Especialidad" value={formData.specialty} onChange={handleChange} required style={styles.inputStyle} />
          <label style={styles.labelStyle}>Disponible desde:</label>
          <input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required style={styles.inputStyle} />
          <label style={styles.labelStyle}>Disponible hasta:</label>
          <input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange} required style={styles.inputStyle} />
          <button type="submit" style={styles.submitButtonStyle}>Actualizar Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorEdit;
