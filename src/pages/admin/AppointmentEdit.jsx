import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div style={{ padding: '2rem' }}>
      <ToastContainer />
      <h2 style={{ color: '#1565c0' }}>Editar Cita Médica</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <label>Hora inicio:</label>
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required style={inputStyle} />
        <label>Hora fin:</label>
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required style={inputStyle} />
        <select name="status" value={formData.status} onChange={handleChange} required style={inputStyle}>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
        <button type="submit" style={buttonStyle}>Actualizar</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px'
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

export default AppointmentEdit;
