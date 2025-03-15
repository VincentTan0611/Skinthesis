import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import AdminHeader from "../../components/AdminHeader";
import Footer2 from "../../components/Footer2";
import { useNavigate } from "react-router-dom";

const AdminPatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchPatients = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const querySnapshot = await getDocs(usersRef);
        
        // Log the raw data to debug
        console.log("Raw Firestore data:", querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        
        const allPatients = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(user => user.role === "user" || !user.role); // Include users without role specified

        console.log("Filtered patients:", allPatients); // Debug log
        setPatients(allPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Debug log for rendered patients
  console.log("Current patients state:", patients);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredPatients = patients.filter(patient =>
    patient.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Debug log for filtered patients
  console.log("Filtered patients for display:", filteredPatients);

  return (
    <>
      <AdminHeader />
      <div style={styles.container}>
        <h1 style={styles.title}>Patients</h1>
        <p style={styles.subTitle}>Administrator View</p>
        <p style={styles.subTitle}>Total Patients: {patients.length}</p>

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
                <th style={styles.tableHeader}>Appointment Date</th>
                <th style={styles.tableHeader}>Appointment Time</th>
                <th style={styles.tableHeader}>Dermatologist</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    No patients found
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  // Get the latest appointment
                  const latestAppointment = patient.appointments?.[patient.appointments.length - 1];
                  
                  return (
                    <tr 
                      key={patient.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/admin/patient/${patient.id}`)}
                    >
                      <td style={styles.patientInfoCell}>
                        <div style={styles.patientInfo}>
                          <img
                            src={patient.profilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName || 'User')}&background=random`}
                            alt={patient.fullName || 'User'}
                            style={styles.profileImage}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName || 'User')}&background=random`;
                            }}
                          />
                          <span style={styles.patientName}>{patient.fullName || 'Unnamed User'}</span>
                        </div>
                      </td>
                      <td style={styles.tableCell}>{patient.sex || 'Not specified'}</td>
                      <td style={styles.tableCell}>
                        {latestAppointment ? (
                          latestAppointment.aptDisplayDate || new Date(latestAppointment.aptDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        ) : (
                          <span style={{ opacity: 0.4 }}>No appointment</span>
                        )}
                      </td>
                      <td style={styles.tableCell}>
                        {latestAppointment?.aptTime || <span style={{ opacity: 0.4 }}>-</span>}
                      </td>
                      <td style={styles.tableCell}>
                        {latestAppointment ? (
                          ` ${latestAppointment.aptDerma}`
                        ) : (
                          <span style={{ opacity: 0.4 }}>Not assigned</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default AdminPatientList; 