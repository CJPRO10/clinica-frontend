import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterMedicalRecord() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/appointments');
        // Filtrar solo citas COMPLETED
        const completed = res.data.filter(a => a.status === 'COMPLETED');
        setAppointments(completed);
      } catch (err) {
        toast.error('Error al obtener citas');
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
      setDiagnosis('');
      setNotes('');
      setSelectedAppointment('');
    } catch (err) {
      toast.error('Error al registrar historial');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <ToastContainer />
      <h2 style={{ color: '#388e3c' }}>Registrar Diagnóstico</h2>
      <form onSubmit={handleSubmit}>
        <label>Cita (COMPLETED):</label>
        <select value={selectedAppointment} onChange={e => setSelectedAppointment(e.target.value)} style={{ padding: '8px', margin: '10px' }}>
          <option value="">Selecciona una cita</option>
          {appointments.map(a => (
            <option key={a.id} value={a.id}>
              {a.patientFullName} | {a.startTime}
            </option>
          ))}
        </select>

        <div>
          <label>Diagnóstico:</label>
          <textarea value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required style={{ width: '100%', height: '80px' }} />
        </div>

        <div>
          <label>Notas:</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', height: '80px' }} />
        </div>

        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#388e3c', color: 'white', border: 'none', borderRadius: '6px' }}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterMedicalRecord;
