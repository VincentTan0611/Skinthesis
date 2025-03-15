import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import defaultProfileImage from '../images/profile.png';
import nameImage from '../images/name.png';
import logoImage from '../images/logo.png';
import useDermLogout from '../hooks/useDermLogout';
import useDermAuthStore from '../../store/dermAuthStore';

function Header1() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const dermatologist = useDermAuthStore((state) => state.dermatologist);
  const { logout: handleLogout } = useDermLogout();

  // Update profile image from Firestore
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.email) {
        try {
          const q = query(
            collection(firestore, "dermatologists"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();    
            if (userData.profilePicUrl) {
              setProfileImage(userData.profilePicUrl);
            } else {
              // If no profile picture, create one using initials
              const initials = userData.fullName
                ? userData.fullName.split(' ').map(n => n[0]).join('')
                : 'D';
              setProfileImage(`https://ui-avatars.com/api/?name=${initials}&background=random`);
            }
          }
        } catch (error) {
          console.error("Error fetching dermatologist profile:", error);
          setProfileImage(defaultProfileImage);
        }
      } else {
        setProfileImage(defaultProfileImage);
      }
    });

    return () => unsubscribe();
  }, []);

  // Check login state
  useEffect(() => {
    const updateLoginState = () => {
      const dermInfo = localStorage.getItem('dermatologist-info');
      setIsLoggedIn(!!dermInfo);
    };

    updateLoginState();
    window.addEventListener('storage', updateLoginState);

    return () => {
      window.removeEventListener('storage', updateLoginState);
    };
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeProfileMenu = () => setProfileMenuOpen(false);

  const handleLogOut = () => {
    handleLogout();
    setIsLoggedIn(false);
    setProfileImage(defaultProfileImage);
    closeProfileMenu();
    navigate('/');
  };

  const handleLogIn = () => {
    closeProfileMenu();
    navigate('/');
  };

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
    logo: { height: '40px' },
    features: {
      display: 'flex',
      gap: '25px',
      alignItems: 'center',
      position: 'relative',
      marginLeft: 'auto',
    },
    featureIcon: { 
      height: '30px', 
      cursor: 'pointer', 
      borderRadius: '100%'
    },
    profileMenuContainer: {
      position: 'relative',
    },
    profileMenu: {
      position: 'absolute',
      top: '70px',
      right: 0,
      boxShadow: '0 0.5px 2px 1px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#ffeef0',
      width: '160px',
      textAlign: 'center',
      padding: '2px 0',
      transform: 'scale(0.8)',
      transformOrigin: 'top',
      opacity: 0,
      visibility: 'hidden',
      transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      border: '1px solid #b12e34',
    },
    profileMenuOpen: {
      transform: 'scale(1)',
      opacity: 1,
      visibility: 'visible',
    },
    profileMenuItem: {
      padding: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#b12e34',
      fontWeight: 'normal',
      transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
    },
    profileMenuItemHover: {
      color: '#b12e34',
      fontWeight: 'bold',
    },
    divider: {
      width: '80%',
      height: '1px',
      margin: '6px auto',
      backgroundColor: '#b12e34',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={nameImage} alt="Skinthesis Name" style={styles.logo} />
        <img src={logoImage} alt="Skinthesis Logo" style={styles.logo} />
      </div>

      <div style={styles.features}>
        <div 
          style={styles.profileMenuContainer}
          ref={profileRef}
        >
          <img
            src={profileImage}
            alt="Profile"
            style={styles.featureIcon}
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            onError={(e) => {
              console.log("Failed to load profile image:", e.target.src);
              const initials = dermatologist?.fullName
                ? dermatologist.fullName.split(' ').map(n => n[0]).join('')
                : 'D';
              e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=random`;
            }}
          />

          <div
            style={{
              ...styles.profileMenu,
              ...(profileMenuOpen ? styles.profileMenuOpen : {}),
            }}
          >
            {!isLoggedIn && (
              <div
                style={styles.profileMenuItem}
                onClick={handleLogIn}
                onMouseEnter={(e) => {
                  e.target.style.color = styles.profileMenuItemHover.color;
                  e.target.style.fontWeight = styles.profileMenuItemHover.fontWeight;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = styles.profileMenuItem.color;
                  e.target.style.fontWeight = styles.profileMenuItem.fontWeight;
                }}
              >
                Log In
              </div>
            )}

            {isLoggedIn && (
              <>
                <div
                  style={styles.profileMenuItem}
                  onClick={handleLogOut}
                  onMouseEnter={(e) => {
                    e.target.style.color = styles.profileMenuItemHover.color;
                    e.target.style.fontWeight = styles.profileMenuItemHover.fontWeight;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = styles.profileMenuItem.color;
                    e.target.style.fontWeight = styles.profileMenuItem.fontWeight;
                  }}
                >
                  Log Out
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header1;


