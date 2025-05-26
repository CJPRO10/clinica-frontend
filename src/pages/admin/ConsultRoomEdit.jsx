import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';

function ConsultRoomEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    floor: '',
    description: ''
  });

  useEffect(() => {
    axios.get(`/rooms/${id}`)
      .then(res => setFormData({
        name: res.data.name || '',
        floor: res.data.floor?.toString() || '',
        description: res.data.description || ''
      }))
      .catch(() => toast.error('Error al cargar el consultorio'));
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
      const payload = { ...formData, floor: parseInt(formData.floor) };
      await axios.put(`/rooms/${id}`, payload);
      toast.success('Consultorio actualizado correctamente');
      setTimeout(() => navigate('/dashboard/admin/rooms'), 1500);
    } catch {
      toast.error('Error al actualizar el consultorio');
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <h2 style={titleStyle}>Editar Consultorio</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="floor"
          placeholder="Piso"
          value={formData.floor}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Actualizar</button>
      </form>
    </div>
  );
}

const containerStyle = {
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  minHeight: '100vh'
};

const titleStyle = {
  color: '#1b5e20',
  marginBottom: '1.5rem'
};

const formStyle = {
  maxWidth: '500px',
  background: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  resize: 'vertical'
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#2e7d32',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default ConsultRoomEdit;
