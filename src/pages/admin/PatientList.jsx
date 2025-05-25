import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
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

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      setPatients(res.data);
    } catch (error) {
      toast.error('Error al obtener pacientes');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/patients/${selectedPatient.id}`);
      toast.success('Paciente eliminado correctamente');
      fetchPatients();
    } catch (error) {
      toast.error('Error al eliminar el paciente');
    } finally {
      setOpenDialog(false);
      setSelectedPatient(null);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={toolbarStyle}>
        <button onClick={() => navigate('/dashboard/admin')} style={backButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
          Regresar
        </button>
        <h2 style={titleStyle}>Lista de Pacientes</h2>
        <button onClick={() => navigate('/dashboard/admin/patients/new')} style={newButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>person_add</span>
          Nuevo Paciente
        </button>
      </div>

      {loading ? (
        <p style={{ fontSize: '1.1rem', textAlign: 'center', color: 'black' }}>Cargando pacientes...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#e3f2fd' }}>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Teléfono</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={tdStyle}>{patient.fullName}</td>
                  <td style={tdStyle}>{patient.email}</td>
                  <td style={tdStyle}>{patient.phone}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => navigate(`/dashboard/admin/patients/edit/${patient.id}`)}
                      style={editButtonStyle}
                    >
                      <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>edit</span>
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDelete(patient)}
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
        </div>
      )}

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Eliminar paciente?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar al paciente "{selectedPatient?.fullName}"? Esta acción no se puede deshacer.
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
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#333'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  color: '#444'
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

export default PatientList;
