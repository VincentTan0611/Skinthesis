import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import Header2 from "../../components/Header2";
import Footer2 from "../../components/Footer2";

const PatientDetail = () => {
  const [patient, setPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScanIndex, setSelectedScanIndex] = useState(null);
  const [diameter, setDiameter] = useState("");
  const { id } = useParams();

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

  const handleAddDiagnosis = (index) => {
    setSelectedScanIndex(index);
    setIsModalOpen(true);
  };

  const handleSubmitDiagnosis = async () => {
    try {
      const updatedScans = [...patient.scans];
      updatedScans[selectedScanIndex] = {
        ...updatedScans[selectedScanIndex],
        diameter: parseFloat(diameter)
      };

      const userDocRef = doc(firestore, "users", id);
      await updateDoc(userDocRef, {
        scans: updatedScans
      });

      // Update local state
      setPatient(prev => ({
        ...prev,
        scans: updatedScans
      }));

      // Close modal and reset
      setIsModalOpen(false);
      setSelectedScanIndex(null);
      setDiameter("");
    } catch (error) {
      console.error("Error updating diagnosis:", error);
    }
  };

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

  const latestScan = patient?.scans && patient.scans.length > 0 ? 
    [...patient.scans].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0] : null;

  const getLesionTypeStyles = (scan) => {
    if (!scan?.prediction) return {
      backgroundColor: '#f3f4f6',
      color: '#6b7280'
    };

    const prediction = scan.prediction.toLowerCase();
    // ...
  };

  return (
    <div style={styles.pageWrapper}>
      <Header2 />
      <div style={styles.container}>
        <div style={styles.gridContainer}>
          {/* Patient Info Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Patient</h2>
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
            {/* Next Appointment Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Next appointment</h2>
              {lastAppointment && (
                <p style={styles.lastAppointment}>
                  Last appointment: {formatDateTime(lastAppointment.aptDate, lastAppointment.aptTime)}
                </p>
              )}
              {nextAppointment ? (
                <p style={styles.nextAppointment}>
                  {formatDateTime(nextAppointment.aptDate, nextAppointment.aptTime)}
                </p>
              ) : (
                <p style={styles.noAppointment}>No upcoming appointments</p>
              )}
            </div>

            {/* Classification Results Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Classification results</h2>
              <div style={styles.resultsContainer}>
                {patient?.scans?.sort((a, b) => 
                  new Date(b.timestamp) - new Date(a.timestamp)
                ).map((scan, index) => (
                  <div key={index} style={styles.resultRow}>
                    <span style={styles.scanDate}>
                      {new Date(scan.timestamp).toLocaleDateString()}
                    </span>
                    <img 
                      src={scan.skinLesionPicUrl} 
                      alt="Skin Lesion" 
                      style={styles.scanImage} 
                    />
                    <div style={styles.resultInfo}>
                      <h3 style={styles.diagnosis}>{scan.prediction || "Not Classified"}</h3>
                      {scan.diameter && (
                        <p style={styles.size}>{scan.diameter}mm</p>
                      )}
                    </div>
                    <span 
                      onClick={() => handleAddDiagnosis(index)}
                      style={styles.addDiagnosisText}
                    >
                      Add Diagnosis
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Modal */}
        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Add Lesion Diameter</h3>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                placeholder="Enter diameter in mm"
                style={styles.input}
              />
              <div style={styles.modalButtons}>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={styles.cancelButton}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'} // 👈 Reduce opacity on hover
                onMouseLeave={(e) => e.target.style.opacity = '1'} // 👈 Reset opacity when not hovered
              >
                Cancel
              </button>

              <button 
                onClick={handleSubmitDiagnosis}
                style={styles.submitButton}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'} // 👈 Reduce opacity on hover
                onMouseLeave={(e) => e.target.style.opacity = '1'} // 👈 Reset opacity when not hovered
              >
                Submit
              </button>
              </div>
            </div>
          </div>
        )}
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
    marginBottom: '30px',
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
  scanDate: {
    color: '#000',
    fontSize: '12px',
    position: 'absolute',
    right: '0',
    top: '0',
    opacity: 0.5,
  },
  addDiagnosisText: {
    fontWeight: 'bold',
    color: '#b12e34',
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: 'auto', 
    alignSelf: 'flex-start',
  },  
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '14px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'opacity 0.3s ease',
  },
  submitButton: {
    backgroundColor: '#b12e34',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'opacity 0.3s ease',
  },
  size: {
    color: '#000',
    fontSize: '12px',
    opacity: 0.5,
  },
};

export default PatientDetail;