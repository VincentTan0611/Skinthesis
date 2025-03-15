import React, { useRef } from 'react';

function Menu({ isOpen }) {

  const menuRef = useRef(null);

  const styles = {
    menu: {
      position: 'fixed',
      top: '91px',
      left: isOpen ? '0' : '-280px',
      backgroundColor: '#ffeef0',
      zIndex: 1000,
      width: '280px',
      height: 'calc(100vh - 90px)',
      boxShadow: '1px 0px 4px rgba(0, 0, 0, 0.1)',
      transition: 'left 0.5s ease-in-out',
    },
    menuList: {
      listStyleType: 'none',
      margin: '0px 20px',
      padding: 0,
    },
    menuIcon: {
      width: '25px',
      height: 'auto',
    },
  };

  return (
    <div ref={menuRef} style={styles.menu}>
      <ul style={styles.menuList}>
        {[
          { href: '/', text: 'Home', icon: 'src/images/home.png' },
          { href: '/consent', text: 'Scan Lesion', icon: 'src/images/upload.png' },
          { href: '/appointment', text: 'Schedule Appointment', icon: 'src/images/appointment.png' },
          { href: '/Risk', text: 'Risk Assessment', icon: 'src/images/risk.png' },
          { href: '/tracker', text: 'Skin Health Tracker', icon: 'src/images/tracker.png' },
        ].map((item, index) => (
          <li key={index}>
            <a href={item.href} className="menu-item">
              <img src={item.icon} alt={`${item.text} Icon`} style={styles.menuIcon} />
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;