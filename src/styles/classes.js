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

const containerStyleList = {
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
  height: '100vh',
  width: '100vw',
  textAlign: 'center',    
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  color: '#444',
  border: '1px solid #ddd',
  textAlign: 'center'
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
  marginBottom: '1.5rem',
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
  textAlign: 'left',
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

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1.5rem',
  flexWrap: 'wrap',
  gap: '1rem',
};

export {
  containerStyle,
  cardStyle,
  titleStyle,
  subtitleStyle,
  buttonGroupStyle,
  navButtonStyle,
  iconStyle,
  toolbarStyle,
  backButtonStyle,
  labelStyle,
  inputStyle,
  submitButtonStyle,
  tableStyle,
  containerStyleList,
  tdStyle,
};