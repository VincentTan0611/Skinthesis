import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SkinHealthTracker = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserData(currentUser.uid);
      } else {
        setLoading(false);
        setError("Please log in to view your health tracker");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Handle scans only
        if (userDoc.data().scans) {
          const sortedScans = [...userDoc.data().scans]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 2);

          setScans(sortedScans);
          
          if (sortedScans.length === 2 && 
              sortedScans[0].diameter && 
              sortedScans[1].diameter) {
            const currentDiameter = sortedScans[0].diameter;
            const previousDiameter = sortedScans[1].diameter;
            setHealthStatus(currentDiameter > previousDiameter ? 'worsened' : 'improved');
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load health tracker data");
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={styles.pageWrapper}>
      <Header />
      <div style={styles.loadingContainer}>Loading...</div>
      <Footer />
    </div>
  );

  if (error) return (
    <div style={styles.pageWrapper}>
      <Header />
      <div style={styles.errorContainer}>{error}</div>
      <Footer />
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Skin Health Tracker</h1>

        {healthStatus && (
          <p style={styles.statusMessage}>
            Your skin health has {healthStatus} since the last check-up.
          </p>
        )}

        <div style={styles.scansContainer}>
          {scans.map((scan, index) => (
            <div key={index} style={styles.scanCard}>
              <div style={styles.labelContainer}>
                <span style={styles.timeLabel}>
                  {index === 0 ? 'After' : 'Before'}
                </span>
              </div>
              <img 
                src={scan.skinLesionPicUrl} 
                alt={`Scan ${index + 1}`} 
                style={styles.scanImage}
              />
              <div style={styles.scanInfo}>
                <p style={styles.scanDate}>
                  {new Date(scan.timestamp).toLocaleDateString()}
                </p>
                <p style={styles.diagnosis}>
                  {scan.prediction}
                </p>
                {scan.diameter && (
                  <p style={styles.diameter}>
                    {scan.diameter}mm
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  container: {
    maxWidth: '1200px',
    margin: '80px auto 32px',
    padding: '0 32px',
    flex: 1,
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '20px',
  },
  statusMessage: {
    color: '#E11D48',
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '32px',
  },
  scansContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  scanCard: {
    backgroundColor: '#FFF1F3',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  scanImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  scanInfo: {
    textAlign: 'center',
    width: '100%',
  },
  scanDate: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 8px 0',
  },
  diagnosis: {
    fontSize: '18px',
    margin: '0',
  },
  diameter: {
    fontSize: '14px',
    color: '#666',
    margin: '4px 0 0 0',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)', // Account for header and footer
    fontSize: '18px',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)', // Account for header and footer
    fontSize: '18px',
    color: '#E11D48',
  },
  labelContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  timeLabel: {
    backgroundColor: '#E11D48',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default SkinHealthTracker; 