import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import AdminHeader from "../../components/AdminHeader";
import Footer2 from "../../components/Footer2";
import { useNavigate } from "react-router-dom";

const DermatologistList = () => {
  const [dermatologists, setDermatologists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDermatologists = async () => {
      try {
        const dermaRef = collection(firestore, "dermatologists");
        const dermaSnapshot = await getDocs(dermaRef);
        const usersRef = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersRef);
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const dermaData = dermaSnapshot.docs.map(doc => {
          const derma = { id: doc.id, ...doc.data() };
          const patientCount = users.filter(user => 
            user.appointments?.some(apt => apt.aptDerma === derma.fullName)
          ).length;
          return { ...derma, patientCount };
        });

        setDermatologists(dermaData);
      } catch (error) {
        console.error("Error fetching dermatologists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDermatologists();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredDermatologists = dermatologists.filter(derma =>
    derma.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div style={styles.container}>
        <h1 style={styles.title}>Dermatologists</h1>
        <p style={styles.subTitle}>Administrator View</p>
        <p style={styles.subTitle}>Total Dermatologists: {dermatologists.length}</p> {/* Dermatologist count added */}
        
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search dermatologist name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.addButton} onClick={() => navigate('/dermasignup')}>Add</button>
        </div>
  
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Dermatologist</th>
                <th style={styles.tableHeader}>Sex</th>
                <th style={styles.tableHeader}>Contact Number</th>
                <th style={{...styles.tableHeader, textAlign: 'center'}}>Number of Patients</th>
              </tr>
            </thead>
            <tbody>
              {filteredDermatologists.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px', opacity: 0.5, fontSize:'14px' }}>No dermatologists found</td>
                </tr>
              ) : (
                filteredDermatologists.map((derma) => (
                  <tr key={derma.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/dermatologist/${derma.id}`)}>
                    <td style={styles.tableCell}>
                      <div style={styles.dermaInfo}>
                        <img
                          src={derma.profilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(derma.fullName || 'Doctor')}&background=random`}
                          alt={derma.fullName || 'Doctor'}
                          style={styles.profileImage}
                        />
                        <span style={styles.dermaName}>{derma.fullName || 'Unnamed Doctor'}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{derma.gender || 'Not specified'}</td>
                    <td style={styles.tableCell}>{derma.contactNumber || 'No contact number'}</td>
                    <td style={styles.patientCountCell}>{derma.patientCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer2 />
    </>
  );  
};

const styles = {
  // Container
  container: {
    maxWidth: "auto",
    margin: "80px auto 0",
    textAlign: "center",
    padding: "20px",
    minHeight: "calc(100vh - 198px)"
  },

  // Titles
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#000",
    paddingTop: "20px"
  },

  subTitle: {
    fontSize: "14px",
    color: "gray"
  },

  // Search bar
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    gap: "10px"
  },

  searchInput: {
    width: "800px",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    height: "43px"
  },

  // Add button
  addButton: {
    backgroundColor: "#b12e34",
    color: "white",
    border: "none",
    padding: "10px 23px",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    height: "43px",
    fontWeight: "bold"
  },

  // Table container
  tableWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },

  table: {
    width: "80%",
    borderCollapse: "collapse"
  },

  // Table header
  tableHeader: {
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "2px solid #ddd"
  },

  // Table cell
  tableCell: {
    padding: "12px 20px",
    fontSize: "12px",
    textAlign: "left",
    borderBottom: "1px solid #eee"
  },

  // Add new style for patient count cell
  patientCountCell: {
    padding: "12px 20px",
    fontSize: "12px",
    textAlign: "center",
    borderBottom: "1px solid #eee"
  },

  // Dermatologist information
  dermaInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  profileImage: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  dermaName: {
    fontWeight: "bold",
    fontSize: "14px",
    marginLeft: "10px"
  }
};

export default DermatologistList;