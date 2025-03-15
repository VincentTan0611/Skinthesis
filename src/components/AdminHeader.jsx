import React from 'react';
import { useNavigate } from "react-router-dom";
import nameImage from '../images/name.png';
import logoImage from '../images/logo.png';

function AdminHeader() {
  const navigate = useNavigate();

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 30px',
      backgroundColor: '#ffeef0',
      borderBottom: '1px solid #b12e34',
      width: '100%',
      height: '90px',
      position: 'fixed',
      top: 0,
      zIndex: 1000,
      boxSizing: 'border-box',
    },
    logoContainer: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logo: { 
      height: '40px' 
    },
    features: {
      display: 'flex',
      gap: '25px',
      alignItems: 'center',
      position: 'relative',
      marginLeft: 'auto',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={nameImage} alt="Skinthesis Name" style={styles.logo} />
        <img src={logoImage} alt="Skinthesis Logo" style={styles.logo} />
      </div>
      <div style={styles.features}>
        {/* Keeping the features div for layout consistency but without avatar */}
      </div>
    </header>
  );
}

export default AdminHeader;