import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import * as styles from '../../styles/classes';

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al obtener detalles del consultorio');
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) return <p>Cargando...</p>;

  return (
    <div style={styles.containerStyle}>
        <div style={styles.cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={styles.titleStyle}>Detalles del Consultorio</h2>
            </div>
            <label style={styles.labelStyle}>Nombre: {room.id}</label>
            <label style={styles.labelStyle}>Ubicación: {room.name}</label>
            <label style={styles.labelStyle}>Capacidad: {room.location}</label>
        </div>
    </div>
  );
}

export default RoomDetail;
