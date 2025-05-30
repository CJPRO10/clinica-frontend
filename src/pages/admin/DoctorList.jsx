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
import { labelStyle } from '../../styles/classes';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState('');
  const [allDoctors, setAllDoctors] = useState([]);


  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/doctors');
      setDoctors(res.data);
      setAllDoctors(res.data); // Guardar todos los doctores para filtrar
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al obtener doctores');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (doctor, index) => {
    setSelectedDoctor({ ...doctor, index });
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/doctors/${selectedDoctor.id}`);
      toast.success('Doctor eliminado correctamente');
      fetchDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar el doctor');
    } finally {
      setOpenDialog(false);
      setSelectedDoctor(null);
    }
  };

  const handleSearch = async () => {
    if (!specialty.trim()) {
      setDoctors(allDoctors); // restaura todos si está vacío
      return;
    }

    try {
      const res = await axios.get(`/doctors?specialty=${specialty}`);
      setDoctors(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se encontraron doctores con esa especialidad');
    }
  };



  useEffect(() => {
    fetchDoctors();
  }, []);

  const formatTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return 'No definido';
  
  // Función para formatear una hora individual
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = minutes;
    
    // Determinar AM/PM
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // Convertir 0 a 12 para formato 12h
    
    return `${displayHour}:${minute} ${period}`;
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

  return (
    <div style={containerStyle}>
      <ToastContainer />

      <div style={toolbarStyle}>
        <button onClick={() => navigate('/dashboard/admin')} style={backButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
          Regresar
        </button>
        <h2 style={titleStyle}>Lista de Doctores</h2>
        <button onClick={() => navigate('/dashboard/admin/doctors/new')} style={newButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>person_add</span>
          Nuevo Doctor
        </button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Ej: pediatria"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0288d1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Buscar
        </button>
      </div>



      {/* Tabla */}
      <div style={{ overflowX: 'auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'black' }}>Cargando doctores...</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#bbdefb' }}>
                <th style={thStyle}>N°</th>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Especialidad</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Horario</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td style={tdStyle}>{index +1}</td>
                  <td style={tdStyle}>{doctor.fullName}</td>
                  <td style={tdStyle}>{doctor.specialty}</td>
                  <td style={tdStyle}>{doctor.email}</td>
                  <td style={tdStyle}>{formatTimeRange(doctor.availableFrom, doctor.availableTo)}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => navigate(`/dashboard/admin/doctors/edit/${doctor.id}`)}
                      style={editButtonStyle}
                    >
                      <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>edit</span>
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDelete(doctor, index+1)}
                      style={deleteButtonStyle}
                    >
                      <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>delete</span>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Eliminar doctor?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar al doctor N° {selectedDoctor?.index} con nombre "{selectedDoctor?.fullName}"? <br /> Esta acción no se puede deshacer.
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


export default DoctorList;
