import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import * as styles from '../../styles/classes';

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`/patients/${id}`);
        setPatient(res.data);
      } catch (error) {
        toast.error(error?.err ||'Error al obtener detalles del paciente');
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <p>Cargando...</p>;

  return (
    <div style={styles.containerStyle}>
        <div style={styles.cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={styles.titleStyle}>Detalles del paciente</h2>
            </div>
            <label style={styles.labelStyle}>Nombre: {patient.fullName}</label>
            <label style={styles.labelStyle}>Email: {patient.email}</label>
            <label style={styles.labelStyle}>Teléfono: {patient.phone}</label>
        </div>
    </div>
  );
}

export default PatientDetail;
