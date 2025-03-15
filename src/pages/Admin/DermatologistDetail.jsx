import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import AdminHeader from "../../components/AdminHeader";
import Footer2 from "../../components/Footer2";

const DermatologistDetail = () => {
  const [dermatologist, setDermatologist] = useState(null);
  const [patients, setPatients] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dermatologist data
        const dermaDoc = await getDoc(doc(firestore, "dermatologists", id));
        if (dermaDoc.exists()) {
          setDermatologist({ id: dermaDoc.id, ...dermaDoc.data() });
        }

        // Fetch all patients with appointments for this dermatologist
        const usersRef = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersRef);
        const now = new Date();

        const dermaPatients = usersSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(user => user.appointments?.some(apt => apt.aptDerma === dermaDoc.data().fullName));

        setPatients(dermaPatients);

        // Find next appointment
        const allAppointments = dermaPatients
          .flatMap(patient => 
            patient.appointments
              .filter(apt => apt.aptDerma === dermaDoc.data().fullName)
              .map(apt => ({
                ...apt,
                patientName: patient.fullName
              }))
          )
          .filter(apt => new Date(`${apt.aptDate} ${apt.aptTime}`) > now)
          .sort((a, b) => new Date(`${a.aptDate} ${a.aptTime}`) - new Date(`${b.aptDate} ${b.aptTime}`));

        setNextAppointment(allAppointments[0]);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleRemove = async () => {
    if (window.confirm("Are you sure you want to remove this dermatologist? This action cannot be undone.")) {
      try {
        setIsDeleting(true);
        await deleteDoc(doc(firestore, "dermatologists", id));
        navigate("/admin/dermatologists");
      } catch (error) {
        console.error("Error removing dermatologist:", error);
        alert("Failed to remove dermatologist. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!dermatologist) return <div>Loading...</div>;

  return (
    <div style={styles.pageWrapper}>
      <AdminHeader />
      <div style={styles.container}>
      <p 
        style={styles.removeText}
        onClick={!isDeleting ? handleRemove : undefined}
      >
        {isDeleting ? "Removing..." : "Remove"}
      </p>
      
        <div style={styles.contentGrid}>
          {/* Profile Information Card */}
          <div style={styles.profileCard}>
            <h2 style={styles.cardTitle}>Profile Information</h2>
            <div style={styles.profileContent}>
              <div style={styles.infoGrid}>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Email</span>
                  <span style={styles.value}>{dermatologist.email}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Contact number</span>
                  <span style={styles.value}>{dermatologist.contactNumber}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Gender</span>
                  <span style={styles.value}>{dermatologist.gender || 'Not specified'}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Pending appointments</span>
                  <span style={styles.value}>{patients.reduce((count, patient) => 
                    count + patient.appointments.filter(apt => 
                      apt.aptDerma === dermatologist.fullName && 
                      new Date(`${apt.aptDate} ${apt.aptTime}`) > new Date()
                    ).length, 0)}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Total number of patients</span>
                  <span style={styles.value}>{patients.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image and Next Appointment Card */}
          <div style={styles.rightColumn}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>{dermatologist.fullName}</h1>
            <p style={styles.gender}>{dermatologist.gender}</p>
          </div>
            <div style={styles.profileImageContainer}>
              <img
                src={dermatologist.profilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(dermatologist.fullName)}&background=random`}
                alt={dermatologist.fullName}
                style={styles.profileImage}
              />
            </div>

            <div style={styles.appointmentCard}>
              <h2 style={styles.cardTitle}>Next appointment</h2>
              {nextAppointment ? (
                <div style={styles.appointmentInfo}>
                  <p style={styles.appointmentDate}>
                    {new Date(nextAppointment.aptDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}, {nextAppointment.aptTime}
                  </p>
                  <p style={styles.patientName}>Patient: {nextAppointment.patientName}</p>
                </div>
              ) : (
                <p style={styles.noAppointment}>No upcoming appointments</p>
              )}
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
    padding: '0px 400px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  headerContent: {
    textAlign: 'center',
    flex: 1,
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  gender: {
    fontSize: '14px',
    color: '#000',
    opacity: 0.5,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    margin: 0,
    textAlign: 'center',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '340px',
    backgroundColor: '#ffeef0',
    borderRadius: '20px',
    padding: '20px 50px',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
  },
  profileContent: {
    marginTop: '20px',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    alignItems: 'flex-start', 
  },
  label: {
    color: '#000',
    opacity: 0.5,
    fontSize: '12px',
  },
  value: {
    color: '#000',
    fontWeight: 'bold',
    wordBreak: 'break-word',
    fontSize: '14px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  profileImageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileImage: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '5px 0'
  },
  appointmentCard: {
    width: '700px',
    backgroundColor: '#ffeef0',
    borderRadius: '20px',
    padding: '20px 50px',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
  },
  appointmentInfo: {
    textAlign: 'center',
  },
  appointmentDate: {
    color: '#b12e34',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '16px 0 0 0',
    textAlign: 'center'
  },
  patientName: {
    fontSize: '18px',
    marginBottom: '24px',
  },
  viewButton: {
    backgroundColor: '#E11D48',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  noAppointment: {
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic',
    margin: '16px 0 0 0',
    textAlign: 'center'
  },
  removeText: {
    color: '#b12e34',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '8px',
    right: '50px',
  },
  
};

export default DermatologistDetail; 