import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import * as styles from '../../styles/classes';

function AppointmentDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/appointments/${id}`);
        setAppointment(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message||'Error al obtener detalles de la cita');
      }
    };
    fetchAppointment();
  }, [id]);

  if (!appointment) return <p>Cargando cita...</p>;

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

  return (
    <div style={styles.containerStyle}> 
        <div style={styles.cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={styles.titleStyle}>Detalle de Cita</h2>
            </div>
            <label style={styles.labelStyle}>Nombre: {appointment.patientFullName}</label>
            <label style={styles.labelStyle}>Doctor: {appointment.doctorFullName}</label>
            <label style={styles.labelStyle}>Consultorio: {appointment.consultRoomName}</label>
            <label style={styles.labelStyle}>Fecha y Hora: {formatDateTime(appointment.startTime)} - {formatDateTime(appointment.endTime)}</label>
            <label style={styles.labelStyle}>Estado: {appointment.status}</label>
        </div>
    </div>
  );
}

export default AppointmentDetail;
