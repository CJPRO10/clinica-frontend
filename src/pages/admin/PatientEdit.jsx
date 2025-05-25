import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`/patients/${id}`);
        setFormData({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          phone: res.data.phone || ''
        });
      } catch (err) {
        toast.error('Error al cargar el paciente');
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/patients/${id}`, formData);
      toast.success('Paciente actualizado correctamente');
      setTimeout(() => {
        navigate('/dashboard/admin/patients');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar el paciente');
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={cardStyle}>
        <div style={headerStyle}>
          <button onClick={() => navigate('/dashboard/admin/patients')} style={backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={titleStyle}>Editar Paciente</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={submitButtonStyle}>Actualizar Paciente</button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Estilos
const containerStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  fontFamily: 'Segoe UI, sans-serif',
  boxSizing: 'border-box'
};

const cardStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px',
  boxSizing: 'border-box'
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '1.5rem'
};

const titleStyle = {
  color: '#1565c0',
  fontSize: '1.5rem',
  margin: '1rem auto 0',
  textAlign: 'center',
  width: '100%'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2e7d32',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease'
};

const backButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#d32f2f',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center'
};

export default PatientEdit;
