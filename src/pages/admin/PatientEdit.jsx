import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../styles/classes';

function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`/patients/${id}`);
        setFormData({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          phone: res.data.phone || ''
        });
      } catch (err) {
        toast.error('Error al cargar el paciente');
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/patients/${id}`, formData);
      toast.success('Paciente actualizado correctamente');
      setTimeout(() => {
        navigate('/dashboard/admin/patients');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar el paciente');
    }
  };

  return (
    <div style={styles.containerStyle}>
      <ToastContainer />
      <div style={styles.cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/admin/patients')} style={styles.backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={styles.titleStyle}>Editar Paciente</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <button type="submit" style={styles.submitButtonStyle}>Actualizar Paciente</button>
        </form>
      </div>
    </div>
  );
}

export default PatientEdit;
