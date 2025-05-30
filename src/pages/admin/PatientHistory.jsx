import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import * as styles from '../../styles/classes';
import { useNavigate, useParams } from 'react-router-dom';

function PatientHistory() {
  const { id: patientId } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/records/patient/${patientId}`);
      setRecords(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al obtener el historial');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div style={styles.containerStyleList}>
      <ToastContainer />
      <div style={styles.toolbarStyle}>
        <button onClick={() => navigate('/dashboard/admin/patients')} style={styles.backButtonStyle}>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>arrow_back</span>
          Regresar
        </button>
        <h2 style={styles.titleStyle}>Historial clínico de {records[0]?.patientFullName}</h2>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : records.length === 0 ? (
        <p>No hay registros clínicos para este paciente.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#bbdefb' }}>
                <th>Fecha</th>
                <th>Diagnóstico</th>
                <th>Notas</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td style={styles.tdStyle}>{new Date(record.createdAt).toLocaleString('es-CO', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                  })}</td>
                  <td style={styles.tdStyle}>{record.diagnosis}</td>
                  <td style={styles.tdStyle}>{record.notes}</td>
                  <td style={styles.tdStyle}>{record.doctorFullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PatientHistory;
