import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    availableFrom: '',
    availableTo: ''
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/doctors/${id}`);
        const doctor = res.data;
        setFormData({
          fullName: doctor.fullName || '',
          email: doctor.email || '',
          specialty: doctor.specialty || '',
          availableFrom: doctor.availableFrom || '',
          availableTo: doctor.availableTo || ''
        });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al cargar los datos del doctor');
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/doctors/${id}`, formData);
      toast.success('Doctor actualizado correctamente');
      setTimeout(() => {
        navigate('/dashboard/admin/doctors');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar el doctor');
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Editar Doctor</h2>
          <button onClick={() => navigate('/dashboard/admin/doctors')} style={backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Nombre completo" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="specialty" placeholder="Especialidad" value={formData.specialty} onChange={handleChange} required style={inputStyle} />
          <label style={labelStyle}>Disponible desde:</label>
          <input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required style={inputStyle} />
          <label style={labelStyle}>Disponible hasta:</label>
          <input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={submitButtonStyle}>Actualizar Doctor</button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Estilos
const containerStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
  background: 'linear-gradient(to right, #f1f8e9, #e3f2fd)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif'
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
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
};

const titleStyle = {
  color: '#1565c0',
  margin: 0
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  color: '#333'
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
  fontSize: '0.9rem'
};
export default DoctorEdit;
