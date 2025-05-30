import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import * as styles from '../../styles/classes';


function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error al obtener los datos del doctor');
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) return <p>Cargando...</p>;

  return (
    <div style={styles.containerStyleList}>
      <div style={styles.cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={styles.titleStyle}>Detalles del doctor</h2>
        </div>
        <label style={styles.labelStyle}>Nombre: {doctor.fullName}</label>
        <label style={styles.labelStyle}>Email: {doctor.email}</label>
        <label style={styles.labelStyle}>Especialidad: {doctor.specialty}</label>
        <label style={styles.labelStyle}>Disponible de: {doctor.availableFrom}</label>
        <label style={styles.labelStyle}>Disponible hasta: {doctor.availableTo}</label>
      </div>
    </div>
  );
}

export default DoctorDetail;
