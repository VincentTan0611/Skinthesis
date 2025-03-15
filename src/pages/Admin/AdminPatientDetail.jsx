import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import AdminHeader from "../../components/AdminHeader";
import Footer2 from "../../components/Footer2";

const AdminPatientDetail = () => {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPatient({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  // Format date and time helper function
  const formatDateTime = (date, time) => {
    return `${date}, ${time}`;
  };

  // Get current date at midnight for accurate comparison
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Sort appointments by date
  const sortedAppointments = patient?.appointments?.sort((a, b) => {
    const dateA = new Date(`${a.aptDate} ${a.aptTime}`);
    const dateB = new Date(`${b.aptDate} ${b.aptTime}`);
    return dateA - dateB;
  }) || [];

  // Find next appointment (first appointment after today)
  const nextAppointment = sortedAppointments.find(apt => {
    const aptDate = new Date(`${apt.aptDate} ${apt.aptTime}`);
    return aptDate > now;
  });

  // Find last appointment (most recent appointment before today)
  const lastAppointment = [...sortedAppointments]
    .reverse()
    .find(apt => {
      const aptDate = new Date(`${apt.aptDate} ${apt.aptTime}`);
      return aptDate < now;
    });

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return 'Not provided';
    
    // Handle different date formats
    let birthDate;
    if (dob.includes('/')) {
      // Handle DD/MM/YYYY format
      const [day, month, year] = dob.split('/');
      birthDate = new Date(year, month - 1, day);
    } else {
      // Handle ISO or other formats
      birthDate = new Date(dob);
    }

    // Check if date is valid
    if (isNaN(birthDate.getTime())) {
      return 'Invalid date';
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div style={styles.pageWrapper}>
      <AdminHeader />
      <div style={styles.container}>
        <div style={styles.gridContainer}>
          {/* Patient Info Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Patient Information</h2>
            <div style={styles.profileImageContainer}>
              <img
                src={patient?.profilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient?.fullName)}&background=random`}
                alt="Profile"
                style={styles.profileImage}
              />
            </div>
            <div style={styles.infoGrid}>
              <div style={styles.infoRow}>
                <span style={styles.label}>Name</span>
                <span style={styles.value}>{patient?.fullName}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{patient?.email}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Date of Birth</span>
                <span style={styles.value}>{patient?.dob}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Age</span>
                <span style={styles.value}>{calculateAge(patient?.dob)} years</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Sex</span>
                <span style={styles.value}>{patient?.sex}</span>
              </div>
            
            </div>
          </div>

          <div style={styles.rightColumn}>
            {/* Appointment Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Appointments</h2>
              {lastAppointment && (
                <p style={styles.lastAppointment}>
                  Last appointment: {formatDateTime(lastAppointment.aptDate, lastAppointment.aptTime)}
                  <br />
                  with Dr. {lastAppointment.aptDerma}
                </p>
              )}
              {nextAppointment ? (
                <div>
                  <p style={styles.nextAppointment}>
                    Next: {formatDateTime(nextAppointment.aptDate, nextAppointment.aptTime)}
                  </p>
                  <p style={styles.doctorInfo}>
                    with Dr. {nextAppointment.aptDerma}
                  </p>
                </div>
              ) : (
                <p style={styles.noAppointment}>No upcoming appointments</p>
              )}
            </div>

            {/* Scan Results Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Skin Lesion History</h2>
              <div style={styles.resultsContainer}>
                {patient?.scans?.sort((a, b) => 
                  new Date(b.timestamp) - new Date(a.timestamp)
                ).map((scan, index) => (
                  <div key={index} style={styles.resultRow}>
                    <img 
                      src={scan.skinLesionPicUrl} 
                      alt="Skin Lesion" 
                      style={styles.scanImage} 
                    />
                    <div style={styles.resultInfo}>
                      <h3 style={styles.diagnosis}>{scan.prediction}</h3>
                      {scan.diameter && (
                        <p style={styles.size}>Size: {scan.diameter}mm</p>
                      )}
                      <span style={styles.scanDate}>
                        Scanned on: {new Date(scan.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                {(!patient?.scans || patient.scans.length === 0) && (
                  <p style={styles.noScans}>No skin lesion record available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center', 
    paddingTop: '107px',
  },
  container: {
    maxWidth: '1400px',
    flex: 1,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '450px 1fr',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '800px',
  },
  card: {
    backgroundColor: '#ffeef0',
    borderRadius: '20px',
    padding: '20px 50px',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
  },
  profileImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '32px 0',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#ffd9d9',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  infoRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    fontSize: '14px',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    color: '#000',
  },
  lastAppointment: {
    color: '#666',
    fontSize: '14px',
    margin: '8px 0',
  },
  nextAppointment: {
    color: '#b12e34',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '16px 0 0 0',
  },
  doctorInfo: {
    color: '#666',
    fontSize: '16px',
    margin: '8px 0',
  },
  noAppointment: {
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic',
    margin: '16px 0 0 0',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginTop: '14px',
    width: '700px',
    height: '300px', 
    overflowY: 'auto', 
    paddingRight: '10px', 
  },  
  resultRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    paddingBottom: '10px',
    position: 'relative', 
  },
  scanImage: {
    width: '70px',
    height: '60px',
    objectFit: 'cover',
  },
  resultInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
  },
  diagnosis: {
    fontSize: '15px',
    fontWeight: 'bold',
    margin: 0,
    alignSelf: 'flex-start',
  },
  size: {
    color: '#000',
    fontSize: '12px',
    opacity: 0.5,
  },
  scanDate: {
    color: '#000',
    fontSize: '12px',
    position: 'absolute',
    right: '0',
    top: '0',
    opacity: 0.5,
  },
  noScans: {
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic',
    textAlign: 'center',
    margin: '16px 0 0 0',
  },
};

export default AdminPatientDetail; 