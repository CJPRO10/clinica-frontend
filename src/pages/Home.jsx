import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Bienvenido al Sistema de Gestión Clínica</h1>
      <p>Por favor, inicia sesión o crea una cuenta para continuar</p>
      <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
      <button onClick={() => navigate('/signup')}>Crear Cuenta</button>
    </div>
  );
}

export default Home;
