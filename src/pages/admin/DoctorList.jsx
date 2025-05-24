import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/doctors');
      setDoctors(res.data);
    } catch (error) {
      toast.error('Error al obtener doctores');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este doctor?')) {
      try {
        await axios.delete(`/doctors/${id}`);
        toast.success('Doctor eliminado correctamente');
        fetchDoctors();
      } catch (error) {
        toast.error('Error al eliminar el doctor');
      }
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <ToastContainer />
      <h2 style={{ color: '#1565c0' }}>Lista de Doctores</h2>

      <button
        onClick={() => navigate('/admin/doctors/new')}
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
                    onClick={() => navigate(`/admin/doctors/edit/${doctor.id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
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
