// 🎨 Estilos
const containerStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  padding: '2rem',
  boxSizing: 'border-box'
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px',
  position: 'relative',
  textAlign: 'center'
};

const titleStyle = {
  color: '#2e7d32',
  marginBottom: '0.5rem',
  fontSize: '1.8rem'
};

const subtitleStyle = {
  color: '#555',
  marginBottom: '2rem',
  fontSize: '1rem'
};

const buttonGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const navButtonStyle = (bgColor) => ({
  padding: '14px',
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  transition: 'background-color 0.3s ease'
});

const iconStyle = {
  fontSize: '20px',
  verticalAlign: 'middle'
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

const labelStyle = {
  display: 'block',
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

export {
  containerStyle,
  cardStyle,
  titleStyle,
  subtitleStyle,
  buttonGroupStyle,
  navButtonStyle,
  iconStyle,
  backButtonStyle,
  labelStyle,
  inputStyle,
  submitButtonStyle
};