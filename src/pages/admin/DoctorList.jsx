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

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/doctors');
      setDoctors(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al obtener doctores');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (doctor) => {
    setSelectedDoctor(doctor);
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

  useEffect(() => {
    fetchDoctors();
  }, []);

  

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <ToastContainer />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/dashboard/admin')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}  
        >
          Regresar
        </button>
      </div>
      <h2 style={{ color: '#1565c0' }}>Lista de Doctores</h2>

      <button
        onClick={() => navigate('/dashboard/admin/doctors/new')}
        style={{
          marginBottom: '1rem',
          padding: '10px 20px',
          backgroundColor: '#2e7d32',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        + Nuevo Doctor
      </button>

      {loading ? (
        <p>Cargando doctores...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e3f2fd' }}>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Especialidad</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={tdStyle}>{doctor.fullName}</td>
                <td style={tdStyle}>{doctor.specialty}</td>
                <td style={tdStyle}>{doctor.email}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => navigate(`/dashboard/admin/doctors/edit/${doctor.id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(doctor)}
                    style={{
                      backgroundColor: '#c62828',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Eliminar doctor?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar al doctor "{selectedDoctor?.fullName}"? Esta acción no se puede deshacer.
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

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ccc'
};

export default DoctorList;

