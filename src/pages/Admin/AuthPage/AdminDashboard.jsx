import React from "react";
import AdminHeader from "../../../components/AdminHeader";
import Footer2 from "../../../components/Footer2";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const navigate = useNavigate();
 

 

  return (
    <div style={styles.wrapper}>
      <AdminHeader />
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Welcome Admin</h1>
          <p style={styles.subTitle}>Select an option below to view details.</p>

          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onClick={() => navigate("/admin/dermatologists")}
            >
              Dermatologists
            </button>
            <button
              style={styles.button}
              onClick={() => navigate("/patients")}
            >
              Patients
            </button>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", 
  },
  container: {
    flex: 1, 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    padding: "20px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#000",
    marginTop: "50px",
  },
  subTitle: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#b12e34",
    marginBottom: "40px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
  },
  button: {
    backgroundColor: "#a63d3d",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    width: "300px",
    height: "230px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    minWidth: "200px",
    textAlign: "center",
    transition: "background 0.3s ease",
  },
};

export default AdminDashboard;