import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import * as styles from '../../styles/classes';

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
    <div style={styles.containerStyle}>
      <ToastContainer />
      <div style={styles.cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard/admin/rooms')} style={styles.backButtonStyle}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
            Regresar
          </button>
          <h2 style={styles.titleStyle}>Editar Consultorio</h2>
        </div>
      
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <input
            type="number"
            name="floor"
            placeholder="Piso"
            value={formData.floor}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <button type="submit" style={styles.submitButtonStyle}>Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default ConsultRoomEdit;
