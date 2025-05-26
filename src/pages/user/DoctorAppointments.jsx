import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { textFieldClasses } from '@mui/material';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al obtener citas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(app => {
    const matchesDate = selectedDate ? app.startTime.startsWith(selectedDate) : true;
    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;
    return matchesDate && matchesStatus;
  });

  const formatDateTimeRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const dateFormatter = new Intl.DateTimeFormat('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const timeFormatter = new Intl.DateTimeFormat('es-CO', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return `${dateFormatter.format(startDate)}, ${timeFormatter.format(startDate)} - ${timeFormatter.format(endDate)}`;
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'SCHEDULED': return '#f9a825';
      case 'COMPLETED': return '#2e7d32';
      case 'CANCELLED': return '#c62828';
      default: return '#333';
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <h2 style={titleStyle}>Mi Agenda</h2>

      <div style={filterContainerStyle}>
        <div>
          <label style={labelStyle}>Filtrar por fecha:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Filtrar por estado:</label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="">Todos</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando citas...</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#bbdefb' }}>
                <th style={thStyle}>Paciente</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Consultorio</th>
                <th style={thStyle}>Fecha y Hora</th>
                <th style={thStyle}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(app => (
                <tr key={app.id}>
                  <td style={tdStyle}>{app.patientFullName}</td>
                  <td style={tdStyle}>{app.doctorFullName}</td>
                  <td style={tdStyle}>{app.consultRoomName}</td>
                  <td style={tdStyle}>{formatDateTimeRange(app.startTime, app.endTime)}</td>
                  <td style={{ ...tdStyle, fontWeight: 'bold', color: getStatusColor(app.status) }}>
                    {app.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// 🎨 Estilos
const containerStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif',
  boxSizing: 'border-box'
};

const titleStyle = {
  color: '#1976d2',
  marginBottom: '1.5rem',
  textAlign: 'center',
};

const filterContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '2rem',
  marginBottom: '1rem',
  textAlign: 'center'
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#333',
  display: 'block',
  marginBottom: '0.5rem',
  textAlign: 'center'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
  maxWidth: '250px',
  textAlign: 'center',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const thStyle = {
  padding: '12px',
  borderBottom: '2px solid #ccc',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  color: '#444',
  textAlign: 'center',
  border: '1px solid #ddd',
};

export default DoctorAppointments;
