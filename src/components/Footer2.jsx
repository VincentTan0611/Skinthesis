import React from 'react';
import nameImage from '../images/name.png';
import logoImage from '../images/logo.png';

function Footer2() {
  const styles = {
    footer: {
      backgroundColor: '#ffeef0',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '150px',
      width: '100%',
    },
    logoSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      textAlign: 'center',
      gap: '10px',
    },
    contactSection: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      right: '20px',
      color: '#b12e34',
      fontSize: '12px',
      marginRight: '100px',
      gap: '10px',
    },
    bottomSection: {
      position: 'absolute',
      bottom: '5px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '11px',
      color: '#b12e34',
      textAlign: 'center',
    },
    logo: {
      height: '30px',
    },
    contactItem: {
      fontSize: '11px',
      marginBottom: '2px',
    },
  };

  return (
    <footer style={styles.footer}>
      {/* Logo */}
      <div style={styles.logoSection}>
        <img src={nameImage} alt="Skinthesis Name" style={styles.logo} />
        <img src={logoImage} alt="Skinthesis Logo" style={styles.logo} />
      </div>

      {/* Contact */}
      <div style={styles.contactSection}>
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', marginTop: '2px' }}>Contact Us</h3>
        <p style={styles.contactItem}>
          <a href="mailto:skinthesis@gmail.com" className="footer-link">
            skinthesis@gmail.com
          </a>
        </p>
        <p style={styles.contactItem}>
          <a href="tel:+60123456789" className="footer-link">
            +6012-3456789
          </a>
        </p>
        <p style={styles.contactItem}>
          <a href="/faq" className="footer-link">
            FAQ
          </a>
        </p>
      </div>

      {/* Copyright */}
      <div style={styles.bottomSection}>
        <p>
          <a href="/terms" className="footer-link">Terms & Conditions</a> | 
          <a href="/privacy" className="footer-link"> Privacy Policy</a> | &copy; 2024 Skinthesis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer2;