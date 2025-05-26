import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppointmentCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    consultRoomId: '',
    startTime: '',
    endTime: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/patients').then(res => setPatients(res.data));
    axios.get('/doctors').then(res => setDoctors(res.data));
    axios.get('/rooms').then(res => setRooms(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/appointments', formData);
      toast.success('Cita agendada correctamente');
      setTimeout(() => {
        navigate('/dashboard/admin/appointments');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al agendar la cita');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <ToastContainer />
      <h2 style={{ color: '#1565c0' }}>Agendar Cita Médica</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <select name="patientId" value={formData.patientId} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione paciente</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </select>
        <select name="doctorId" value={formData.doctorId} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione doctor</option>
          {doctors.map(d => <option key={d.id} value={d.id}>{d.fullName}</option>)}
        </select>
        <select name="consultRoomId" value={formData.consultRoomId} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione consultorio</option>
          {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <label>Hora inicio:</label>
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required style={inputStyle} />
        <label>Hora fin:</label>
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Agendar</button>
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

export default AppointmentCreate;
