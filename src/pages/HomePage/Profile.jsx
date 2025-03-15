import React, { useState, useEffect } from 'react';
import Calendar from '../../components/Calendar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useGetUserProfileByEmail from '../../hooks/useGetUserProfileByEmail';
import useUserProfileStore from '../../../store/userProfileStore';
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const { isLoading, userProfile } = useGetUserProfileByEmail(user?.email);
    const navigate = useNavigate();

    const parseDateString = (dateStr) => {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;
        const [day, month, year] = parts;
        return new Date(year, month - 1, day);
    };

    // Get state and actions from the store
    const { setUserProfile, updateProfile } = useUserProfileStore();

    // State for form fields
    const [formData, setFormData] = useState({
        email: '',
        displayName: '',
        fullName: '',
        dob: '',
        profilePicUrl: ''
    });

    // Add this near your other state declarations
    const [statusMessage, setStatusMessage] = useState('');

    // Debug logs
    useEffect(() => {
        if (userProfile) {
            console.log("UserProfile data:", userProfile);
            setFormData({
                email: userProfile.email || '',
                displayName: userProfile.displayName || '',
                fullName: userProfile.fullName || '',
                dob: userProfile.dob || '',
                profilePicUrl: userProfile.profilePicUrl || ''
            });
        }
    }, [userProfile]);

    useEffect(() => {
        console.log("Current formData:", formData);
    }, [formData]);

    const [showCalendarPopup, setShowCalendarPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleAvatarClick = () => {
        document.getElementById("avatarInput").click();
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file && userProfile) {
            try {
                const base64 = await convertToBase64(file);
                console.log("Image converted to base64");
                await handleProfileUpdate({ profilePicUrl: base64 });
                setFormData((prev) => ({
                    ...prev,
                    profilePicUrl: base64
                }));
                console.log("Profile picture updated successfully");
            } catch (error) {
                console.error("Error updating profile picture:", error);
            }
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleDateInputClick = () => {
        setShowCalendarPopup(true);
    };

    const handleDateSelect = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        setFormData((prev) => ({
            ...prev,
            dob: formattedDate
        }));
        setShowCalendarPopup(false);
    };

    const handleNameChange = (newValue) => {
        setFormData({
            ...formData,
            displayName: newValue
        });
    };

    const handleFullNameChange = (event) => {
        setFormData({
            ...formData,
            fullName: event.target.value
        });
    };

    const handleProfileUpdate = async (updates) => {
        try {
            if (!userProfile?.id) {
                console.error('No user profile ID found');
                return;
            }
            const userDocRef = doc(firestore, "users", userProfile.id);
            await updateDoc(userDocRef, updates);

            setFormData((prev) => ({
                ...prev,
                ...updates
            }));
            console.log("Profile updated successfully");
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updates = {
                displayName: formData.displayName,
                fullName: formData.fullName,
                dob: formData.dob,
                profilePicUrl: formData.profilePicUrl
            };
            await handleProfileUpdate(updates);
            console.log("All profile data updated successfully");
            // Show success message
            setStatusMessage('Profile updated successfully!');

            // Clear the message after 3 seconds
            setTimeout(() => {
                setStatusMessage('');
            }, 3000);

        } catch (error) {
            console.error("Error updating profile:", error);
            // Show error message
            setStatusMessage('Failed to update profile. Please try again.');

            // Clear the error message after 3 seconds
            setTimeout(() => {
                setStatusMessage('');
            }, 3000);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        main: {
            flex: 1,
            display: 'flex',
            marginTop: '80px',
            gap: '40px',
            padding: '0 0px',
        },
        leftContainer: {
            backgroundColor: '#ffeef0',
            width: '30%',
            padding: '30px',
            boxSizing: 'border-box',
            marginRight: '20px',
        },
        appointmentsSection: {
            padding: '0',
            borderRadius: '0',
            boxShadow: 'none',
            height: 'fit-content',
        },
        appointmentsTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#black',
            marginTop: '15px',
            marginBottom: '30px',
            textAlign: 'left',
            marginLeft: '10px',
        },
        appointmentsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        appointmentCard: {
            padding: '15px',
            backgroundColor: 'white', // Match the pink background
            borderRadius: '8px',
            border: '1px solid rgba(177, 46, 52, 0.2)',
            width: '100%',
        },
        doctorInfo: {
            marginBottom: '10px',
        },
        doctorName: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#b12e34',
            marginBottom: '5px',
        },
        appointmentDetails: {
            fontSize: '14px',
        },
        dateTime: {
            margin: '5px 0',
            color: '#333',
        },
        location: {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#b12e34',
            fontSize: '14px',
            marginTop: '10px',
        },
        locationIcon: {
            fontSize: '16px',
        },
        noAppointments: {
            textAlign: 'center',
            color: '#666',
            fontStyle: 'italic',
            fontSize: '14px',
        },
        profileContent: {
            display: 'flex',
            position: 'sticky', 
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '20px',
            width: '70%',
            marginTop: '30px',
        },
        avatar: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#ffeef0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.1)',
        },
        avatarImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        name: {
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#000',
            marginTop: '10px',
            cursor: 'pointer',
        },
        form: {
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        inputGroup: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '5px',
            width: '100%',
            marginLeft: '-60px',
        },
        label: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
            flex: '0 0 40%',
        },
        input: {
            padding: '10px',
            fontSize: '14px',
            borderRadius: '15px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            color: 'black',
            flex: '1',
            minWidth: '350px',
        },
        otherinput: {
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
        },
        reportButton: {
            width: '180px',
            height: '50px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: 'rgba(177, 46, 52)',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'block',
            margin: '0 auto',
            marginTop: '35px',
            marginBottom:'15px',
            transition: 'opacity 0.3s',
        },
        saveButton: {
            width: '180px',
            height: '50px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: 'rgba(177, 46, 52)',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'block',
            margin: '0 auto',
            marginTop: '25px',
            marginBottom: '25px',
            transition: 'opacity 0.3s, background-color 0.3s',
        },
        eyeIcon: {
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: '15px',
            height: '15px',
        },
        vecIcon: {
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 2,
            width: '15px',
            height: 'auto',
            cursor: 'pointer',
        },
        dateInputContainer: {
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
        },
        usernameText: {
            fontWeight: 'bold',
            paddingTop: '20px',
            fontSize: '24px',
            cursor: 'text',
            outline: 'none',
        },
        statusMessage: {
            padding: '5px 5px',
            borderRadius: '5px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            backgroundColor: '#white',
            color: '#B12E34',
            opacity: statusMessage ? 1 : 0,
            transition: 'opacity 0.3s ease',
            width: '100%',
            marginTop: '-15px',
        },
    };

    const handleReportHistoryClick = () => {
        navigate('/report');
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <main style={styles.main}>
                    {/* LAppointment (Left) */}
                    <div style={styles.leftContainer}>
                        <h2 style={styles.appointmentsTitle}>Upcoming <br /> Appointments</h2>
                        {userProfile?.appointments && userProfile.appointments.length > 0 ? (
                            <div style={styles.appointmentsList}>
                                {userProfile.appointments.map((apt, index) => (
                                    <div key={index} style={styles.appointmentCard}>
                                        <div style={styles.doctorInfo}>
                                            <h3 style={styles.doctorName}>{apt.aptDerma}</h3>
                                        </div>
                                        <div style={styles.appointmentDetails}>
                                            <p style={styles.dateTime}>
                                                <span style={styles.label}>Date:</span> {(apt.aptDisplayDate)}
                                            </p>
                                            <p style={styles.dateTime}>
                                                <span style={styles.label}>Time:</span> {apt.aptTime}
                                            </p>
                                            <p style={styles.location}>
                                                <span style={styles.locationIcon}>📍</span> B2-3-7
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={styles.noAppointments}>No appointments scheduled</p>
                        )}

                        <button
                            style={styles.reportButton}
                            onClick={handleReportHistoryClick}
                            onMouseOver={(e) => (e.target.style.opacity = '0.7')}
                            onMouseOut={(e) => (e.target.style.opacity = '1')}
                        >
                            Report History
                        </button>
                    </div>

                    {/* Profile Content (Right) */}
                    <div style={styles.profileContent}>
                        <div style={styles.avatar} onClick={handleAvatarClick}
                            onMouseOver={(e) => (e.target.style.opacity = '0.7')}
                            onMouseOut={(e) => (e.target.style.opacity = '1')}
                        >
                            <img
                                src={formData.profilePicUrl || "src/images/profile.png"}
                                alt="Profile"
                                style={{
                                    ...styles.avatarImage,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                                onError={(e) => {
                                    console.log("Image failed to load:", e.target.src);
                                    e.target.src = "src/images/profile.png";
                                }}
                            />
                        </div>
                        <input
                            type="file"
                            id="avatarInput"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <input
                            style={{
                                ...styles.usernameText,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                textAlign: 'center',
                            }}
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="Click here to set username"
                        />

                        <div style={{ margin: '20px 0' }} />
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="email">
                                    Email
                                </label>
                                <input
                                    style={styles.input}
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    readOnly
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleFullNameChange}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="dob">
                                    Date of Birth
                                </label>
                                <div style={styles.dateInputContainer}>
                                    <input
                                        style={styles.input}
                                        type="text"
                                        id="dob"
                                        value={formData.dob}
                                        onClick={handleDateInputClick}
                                        onFocus={(e) => e.target.blur()}
                                        readOnly
                                        placeholder="Click to select date"
                                    />
                                    <img
                                        src="src/images/vector.png"
                                        alt="Dropdown Icon"
                                        style={styles.vecIcon}
                                        onClick={handleDateInputClick}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    marginTop: '20px',
                                }}
                            >
                                <button
                                    type="submit"
                                    style={styles.saveButton}
                                    onMouseOver={(e) => (e.target.style.opacity = '0.7')}
                                    onMouseOut={(e) => (e.target.style.opacity = '1')}
                                >
                                    Save
                                </button>
                            </div>

                            {/* Add status message here, after the buttons */}
                            {statusMessage && (
                                <div style={styles.statusMessage}>
                                    {statusMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </main>
            </div>

            {showCalendarPopup && (
                <div
                    style={{
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
                    }}
                    onClick={() => setShowCalendarPopup(false)}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            position: 'relative',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Calendar
                            visible={showCalendarPopup}
                            onClose={() => setShowCalendarPopup(false)}
                            onSelectDate={handleDateSelect}
                            selectedDate={parseDateString(formData.dob)}
                        />
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Profile;
