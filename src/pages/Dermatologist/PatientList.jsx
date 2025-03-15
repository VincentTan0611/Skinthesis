import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import Header1 from "../../components/Header1";
import Footer from "../../components/Footer";
import useDermAuthStore from "../../../store/dermAuthStore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dermatologist = useDermAuthStore((state) => state.dermatologist);
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: "auto",
      margin: "80px auto 0",
      textAlign: "center",
      padding: "20px",
      minHeight: "calc(100vh - 198px)",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#000",
      paddingTop: "20px",
    },
    subTitle: {
      fontSize: "14px",
      color: "gray",
    },
    searchContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px 0",
      gap: "10px",
    },
    searchInput: {
      width: "800px",
      padding: "10px 20px",
      borderRadius: "25px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      height: "43px",
    },
    tableWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    table: {
      width: "80%",
      borderCollapse: "collapse",
      tableLayout: "auto",
    },
    tableHeader: {
      padding: "12px 20px",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      whiteSpace: "nowrap",
    },
    tableCell: {
      padding: "12px 20px",
      fontSize: "12px",
      textAlign: "left",
      borderBottom: "1px solid #eee",
      whiteSpace: "nowrap",
    },
    patientInfoCell: {
      padding: "12px 20px",
      borderBottom: "1px solid #eee",
      whiteSpace: "nowrap",
    },
    patientInfo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      whiteSpace: "nowrap",
    },
    profileImage: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    patientName: {
      fontWeight: "bold",
      fontSize: "14px",
      marginLeft: "10px",
    },
    appointmentContainer: {
      display: "flex",
      minWidth: "30px",
    },
    appointmentTime: {
      marginLeft: "20px",
    },
  };

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      
      if (!user) {
        navigate("/");
        return;
      }

      const dermData = dermatologist || JSON.parse(localStorage.getItem('dermatologist'));
      
      if (!dermData) {
        navigate("/");
        return;
      }

      try {
        const usersRef = collection(firestore, "users");
        const querySnapshot = await getDocs(usersRef);
        const allPatients = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Get the latest scan result
          const latestScan = data.scans && data.scans.length > 0 ? 
            [...data.scans].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0] : null;
          
          return {
            id: doc.id,
            ...data,
            latestScan
          };
        });

        const filteredPatients = allPatients.filter(patient => {
          return patient.appointments?.some(
            appointment => appointment.aptDerma === dermData.fullName
          );
        });

        const sortedPatients = filteredPatients.sort((a, b) => {
          const aDate = a.appointments?.[a.appointments.length - 1]?.aptDate;
          const bDate = b.appointments?.[b.appointments.length - 1]?.aptDate;
          return new Date(aDate) - new Date(bDate);
        });

        setPatients(sortedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Add this useEffect to handle dermatologist data persistence
  useEffect(() => {
    if (dermatologist) {
      localStorage.setItem('dermatologist', JSON.stringify(dermatologist));
    }
  }, [dermatologist]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredPatients = patients.filter(patient =>
    patient.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLesionTypeStyles = (scan) => {
    if (!scan?.prediction) return {
      backgroundColor: '#f3f4f6',
      color: '#6b7280'
    };

    const prediction = scan.prediction.toLowerCase();
    
    if (prediction.includes('melanoma')) {
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b'
      };
    } else if (prediction.includes('benign')) {
      return {
        backgroundColor: '#dcfce7',
        color: '#166534'
      };
    } else {
      return {
        backgroundColor: '#f3f4f6',
        color: '#6b7280'
      };
    }
  };

  return (
    <>
      <Header1 />
      <div style={styles.container}>
        <h1 style={styles.title}>Patients</h1>
        <p style={styles.subTitle}>{dermatologist?.fullName || 'Loading...'}</p>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Patient</th>
                <th style={styles.tableHeader}>Sex</th>
                <th style={styles.tableHeader}>Appointment details</th>
                <th style={styles.tableHeader}>Classification Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/dermatologist/patients/${patient.id}`)}
                >
                  <td style={styles.patientInfoCell}>
                    <div style={styles.patientInfo}>
                      <img
                        src={patient.profilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName)}&background=random`}
                        alt={patient.fullName}
                        style={styles.profileImage}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName)}&background=random`;
                        }}
                      />
                      <span style={styles.patientName}>{patient.fullName}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{patient.sex}</td>
                  <td style={styles.tableCell}>
                    {patient.appointments && patient.appointments.length > 0 ? (
                      <div style={styles.appointmentContainer}>
                        <span>
                          {new Date(patient.appointments[patient.appointments.length - 1]?.aptDate)
                            .toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                        </span>
                        <span style={styles.appointmentTime}>
                          {patient.appointments[patient.appointments.length - 1]?.aptTime}
                        </span>
                      </div>
                    ) : (
                      <span style={{ opacity: 0.4 }}>None</span>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      ...getLesionTypeStyles(patient.latestScan)
                    }}>
                      {patient.latestScan?.prediction || "Not Classified"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientList; 