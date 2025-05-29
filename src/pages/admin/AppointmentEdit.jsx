import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../styles/classes';

function AppointmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    status: ''
  });

  useEffect(() => {
    axios.get(`/appointments/${id}`)
      .then(res => {
        const app = res.data;
        setFormData({
          startTime: app.startTime,
          endTime: app.endTime,
          status: app.status
        });
      })
      .catch(() => toast.error('Error al cargar la cita'));
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
      await axios.put(`/appointments/${id}`, formData);
      toast.success('Cita actualizada correctamente');
      setTimeout(() => navigate('/dashboard/admin/appointments'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar la cita');
    }
  };

  return (
    <div style={styles.containerStyle}>
      <ToastContainer />
      <div style={styles.cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/admin/appointments')} style={styles.backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={styles.titleStyle}>Editar Doctor</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Hora inicio:</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required style={styles.inputStyle} />
          <label>Hora fin:</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required style={styles.inputStyle} />
          <select name="status" value={formData.status} onChange={handleChange} required style={styles.inputStyle}>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
          <button type="submit" style={styles.submitButtonStyle}>Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentEdit;
