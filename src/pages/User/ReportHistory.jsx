import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          setError("Please log in to view your reports");
          setLoading(false);
          return;
        }

        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().scans) {
          // Sort scans by timestamp in descending order (newest first)
          const sortedScans = [...userDoc.data().scans].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          setReports(sortedScans);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.container}>{error}</div>;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>My Report History</h1>

        {reports.length === 0 ? (
          <p>No scan history available</p>
        ) : (
          reports.map((report, index) => (
            <div key={index} style={styles.reportCard}>
              <p style={styles.date}>
                {new Date(report.timestamp).toLocaleDateString()}
              </p>
              <img 
                src={report.skinLesionPicUrl} 
                alt="Skin Lesion" 
                style={styles.image} 
              />
              <div>
                <p style={styles.diagnosis}>
                  <strong>{report.prediction}</strong>
                </p>
                <p style={styles.fileName}>{report.fileName}</p>
                
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '60%',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '400px',
    fontFamily: 'Inter, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '100px',
    marginBottom: '30px',
  },
  reportCard: {
    position: 'relative',
    minHeight: '70px', // Increased height
    display: 'flex',
    alignItems: 'center',
    background: '#FFEFF0',
    padding: '15px', // Increased padding
    borderRadius: '10px',
    marginBottom: '15px',
    border: '1px solid #000',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  date: {
    position: 'absolute',
    top: '5px',
    right: '20px',
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  image: {
    width: '65px',
    height: '50px',
    objectFit: 'cover',
    padding: '5px 20px 5px 15px',
  },
  diagnosis: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: '5px',
    marginTop: '-1px',
  },
  fileName: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'left',
    marginBottom: '4px',
    marginTop: '-2px',
  },
};

export default ReportHistory;