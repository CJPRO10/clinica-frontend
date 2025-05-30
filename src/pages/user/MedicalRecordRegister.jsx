import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../styles/classes';
import { useNavigate } from 'react-router-dom';

function RegisterMedicalRecord() {
  const [appointments, setAppointments] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const doctorId = localStorage.getItem('doctorId');
        const res = await axios.get(`/appointments/doctor/${doctorId}`);
        // Filtrar solo citas COMPLETED
        const completed = res.data.filter(a => a.status === 'COMPLETED');
        setAppointments(completed);
      } catch (err) {
        toast.error('Error al obtener citas');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) {
      toast.error('Selecciona una cita');
      return;
    }
    try {
      const appointment = appointments.find(a => a.id === parseInt(selectedAppointment));
      const data = {
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        diagnosis,
        notes
      };
      await axios.post('/records', data);
      toast.success('Historial médico registrado');
      setTimeout(() => navigate('/dashboard/doctor'), 1500);
      setDiagnosis('');
      setNotes('');
      setSelectedAppointment('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al registrar historial');
    }
  };

  return (
    <div style={styles.containerStyle}>
      <ToastContainer />
      <div style={styles.cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/doctor')} style={styles.backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={styles.titleStyle}>Registrar Diagnóstico</h2>
        </div>
        {loading ? (
        <p style={{ fontSize: '1.1rem', textAlign: 'center', color: 'black' }}>Cargando pacientes...</p>
        ) : ( 
          <form onSubmit={handleSubmit} style={styles.formStyle}>
            <label style={styles.labelStyle}>Cita (COMPLETADAS):</label>
            <select value={selectedAppointment} onChange={e => setSelectedAppointment(e.target.value)} style={{ padding: '8px', margin: '10px' }}>
              <option value="">Selecciona una cita</option>
              {appointments.map(a => (
                <option key={a.id} value={a.id}>
                  {a.patientFullName} | {a.startTime}
                </option>
              ))}
            </select>
            <div>
              <label style={styles.labelStyle}>Diagnóstico:</label>
              <textarea value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required style={{ width: '100%', height: '80px' }} />
            </div>

            <div>
              <label style={styles.labelStyle}>Notas:</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', height: '80px' }} />
            </div>

            <button type="submit" style={styles.submitButtonStyle}>
              Registrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterMedicalRecord;
