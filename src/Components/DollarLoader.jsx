import React from 'react';
import '../Component_css/DollarLoader.css'; // CSS import kiya

const DollarLoader = () => {
  return (
    <div className="loader-container">
      <div className="dollar-spinner">
        <span className="dollar-symbol">$</span>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

// Demo App
const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <DollarLoader />
    </div>
  );
};

export default App;
