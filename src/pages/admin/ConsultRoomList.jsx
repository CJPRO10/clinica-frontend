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

function ConsultRoomList() {
  const [rooms, setRooms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/rooms');
      setRooms(res.data);
    } catch {
      toast.error('Error al obtener consultorios');
    }
  };

  const confirmDelete = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/rooms/${selectedRoom.id}`);
      toast.success('Consultorio eliminado');
      fetchRooms();
    } catch {
      toast.error('Error al eliminar consultorio');
    } finally {
      setOpenDialog(false);
      setSelectedRoom(null);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={toolbarStyle}>
        <button onClick={() => navigate('/dashboard/admin')} style={backButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
          Regresar
        </button>
        <h2 style={titleStyle}>Lista de Consultorios</h2>
        <button onClick={() => navigate('/dashboard/admin/rooms/new')} style={newButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>add_business</span>
          Nuevo Consultorio
        </button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#bbdefb' }}>
            <th style={thStyle}>N°</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Piso</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td style={tdStyle}>{room.id}</td>
              <td style={tdStyle}>{room.name}</td>
              <td style={tdStyle}>{room.floor}</td>
              <td style={tdStyle}>{room.description}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => navigate(`/dashboard/admin/rooms/edit/${room.id}`)}
                  style={editButtonStyle}
                >
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>edit</span>
                  Editar
                </button>
                <button
                  onClick={() => confirmDelete(room)}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Eliminar consultorio?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el consultorio N° {selectedRoom?.id} con nombre "{selectedRoom?.name}"? <br /> Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancelar</Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">Eliminar</Button>
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

export default ConsultRoomList;
