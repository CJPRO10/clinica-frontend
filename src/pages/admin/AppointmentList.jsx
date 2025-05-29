import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al obtener las citas');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/appointments/${selectedAppointment.id}`);
      toast.success('Cita eliminada correctamente');
      fetchAppointments(); // refresca la lista
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar la cita');
    } finally {
      setOpenDialog(false);
      setSelectedAppointment(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={toolbarStyle}>
        <button onClick={() => navigate('/dashboard/admin')} style={backButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
          Regresar
        </button>
        <h2 style={titleStyle}>Lista de Citas Médicas</h2>
        <button onClick={() => navigate('/dashboard/admin/appointments/new')} style={newButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>person_add</span>
          Nueva Cita
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'black' }}>Cargando citas...</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#bbdefb' }}>
                <th style={thStyle}>Paciente</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Consultorio</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id}>
                  <td style={tdStyle}>{app.patientFullName}</td>
                  <td style={tdStyle}>{app.doctorFullName}</td>
                  <td style={tdStyle}>{app.consultRoomName}</td>
                  <td style={tdStyle}>
                    {formatDateTimeRange(app.startTime, app.endTime)}
                  </td>
                 <td style={tdStyle}>{app.status}</td>
                  <td style={{ ...tdStyle, padding: '8px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button
                        onClick={() => navigate(`/dashboard/admin/appointments/edit/${app.id}`)}
                        style={editButtonStyle}
                        >
                        <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>edit</span>
                        Editar
                        </button>
                        <button
                        onClick={() => confirmDelete(app)}
                        style={deleteButtonStyle}
                        >
                        <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>delete</span>
                        Eliminar
                        </button>
                    </div>
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Eliminar cita?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// 🎨 Estilos
const containerStyle = {
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  height: '100vh',
  width: '100vw'     
};

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  flexWrap: 'wrap',
  gap: '1rem'
};

const titleStyle = {
  color: '#0d47a1',
  margin: 0,
  flexGrow: 1,
  textAlign: 'center'
};

const backButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#b71c1c',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const newButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#1b5e20',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const thStyle = {
  padding: '12px',
  borderBottom: '1px solid #ccc',
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#333',
  border: '1px solid #ddd',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  color: '#444',
  border: '1px solid #ddd',
  textAlign: 'center'
};

const editButtonStyle = {
  marginRight: '10px',
  padding: '6px 12px',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#c62828',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

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

export default AppointmentList;
