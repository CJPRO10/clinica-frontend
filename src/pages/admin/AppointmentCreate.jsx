import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cardStyle, titleStyle, backButtonStyle, inputStyle, containerStyle, labelStyle, submitButtonStyle } from '../../styles/classes';


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
    <div style={containerStyle}>
      <ToastContainer />
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/admin/appointments')} style={backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={titleStyle}>Agendar Cita Médica</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
          <label style={labelStyle}>Hora inicio:</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required style={inputStyle} />
          <label style={labelStyle}>Hora fin:</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={submitButtonStyle}>Agendar</button>
        </form>
      </div>
    </div>
  );
}


export default AppointmentCreate;
