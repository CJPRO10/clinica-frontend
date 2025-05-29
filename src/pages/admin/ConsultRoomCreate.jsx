import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../styles/classes';

function ConsultRoomCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    floor: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir piso a número antes de enviar
      const payload = { ...formData, floor: parseInt(formData.floor) };
      await axios.post('/rooms', payload);
      toast.success('Consultorio creado correctamente');
      setTimeout(() => navigate('/dashboard/admin/rooms'), 1500);
    } catch {
      toast.error('Error al crear el consultorio');
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
          <h2 style={styles.titleStyle}>Registrar Consultorio</h2>
        </div>
        <form onSubmit={handleSubmit} style={styles.formStyle}>
          <input
            type="text"
            name="name"
            placeholder="Nombre del consultorio"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.inputStyle}
          />
          <input
            type="number"
            name="floor"
            placeholder="Piso (ej: 1, 2, 3)"
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
          <button type="submit" style={styles.submitButtonStyle}>Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default ConsultRoomCreate;
