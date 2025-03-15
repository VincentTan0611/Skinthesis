import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useGetUserProfileByEmail from '../../hooks/useGetUserProfileByEmail';
import AptCalendar from '../../components/AptCalendar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function Appointment() {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const { userProfile } = useGetUserProfileByEmail(user?.email);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedSex, setSelectedSex] = useState(userProfile?.sex || '');
    const [showCalendarPopup, setShowCalendarPopup] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const doctorList = [
        'Dr. Chang Choong Chor', 'Dr. Chong Yew Thong', 'Dr. Gim Seng Beh', 'Dr. Loo Keng Shien',
        'Dr. Nazirin Ariffin', 'Dr. Peter Chng', 'Dr. Wung Teng Kuek', 'Dr. Zulkarnain Hassan'
    ];

    const timeSlots = Array.from({ length: 10 }, (_, i) => {
        const hour = String(i + 9).padStart(2, '0'); // Start from 9 AM
        return `${hour}:00`;
    });

    const handleDateInputClick = () => {
        setShowCalendarPopup(true);
    };

    const handleDateSelect = (date) => {
        const dateObj = new Date(date);
        // Store the ISO string for database
        setSelectedDate({
            display: dateObj.toLocaleDateString('en-GB', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            }),
            value: dateObj.toISOString()
        });
        setShowCalendarPopup(false);
    };

    const handleConfirmAppointment = async (e) => {
        e.preventDefault();
        if (selectedDate && selectedTime && selectedDoctor && selectedSex) {
            try {
                if (!userProfile?.id) {
                    console.error('No user profile ID found');
                    return;
                }

                // 1. Update user's document
                const userDocRef = doc(firestore, "users", userProfile.id);
                const appointmentData = {
                    aptDate: selectedDate.value,
                    aptDisplayDate: selectedDate.display,
                    aptTime: selectedTime,
                    aptDerma: selectedDoctor,
                    patientId: userProfile.id,
                    patientName: userProfile.fullName,
                    patientEmail: userProfile.email,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                };

                // 2. Find the dermatologist document
                const dermaQuery = query(
                    collection(firestore, "dermatologists"),
                    where("fullName", "==", selectedDoctor)
                );
                const dermaSnapshot = await getDocs(dermaQuery);

                if (!dermaSnapshot.empty) {
                    const dermaDoc = dermaSnapshot.docs[0];
                    const dermaDocRef = doc(firestore, "dermatologists", dermaDoc.id);

                    // 3. Batch update both documents
                    await Promise.all([
                        // Update user document
                        updateDoc(userDocRef, {
                            sex: selectedSex,
                            appointments: arrayUnion(appointmentData)
                        }),
                        // Update dermatologist document
                        updateDoc(dermaDocRef, {
                            appointments: arrayUnion({
                                ...appointmentData,
                                patientId: userProfile.id,
                                patientName: userProfile.fullName,
                                patientEmail: userProfile.email
                            })
                        })
                    ]);

                    console.log("Appointment saved successfully for both user and dermatologist");
                    setIsConfirmed(true);
                } else {
                    throw new Error("Selected dermatologist not found");
                }

            } catch (error) {
                console.error("Error saving appointment:", error);
                alert("Failed to save appointment. Please try again.");
            }
        } else {
            alert("Please fill in all fields");
        }
    };

    const parseDateString = (dateStr) => {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;
        const [day, month, year] = parts;
        return new Date(year, month - 1, day);
    };

    const handleBack = () => {
        setIsConfirmed(false); // Go back to appointment selection
        navigate('/profile');
    };

    return (
        <>
            <Header />
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.main}>
                        <div style={styles.profileContent}>
                            {!isConfirmed ? (
                                <>
                                    <h2 style={styles.title}>Make an appointment:</h2>

                                    <p style={styles.notice}>Please note: Appointments can only be booked up to 6 months in advance.</p>

                                    <form style={styles.form} onSubmit={handleConfirmAppointment}>

                                        {/* Date Selection */}
                                        <div style={styles.inputGroup}>
                                            <label style={styles.label} htmlFor="date">Date:</label>
                                            <input
                                                style={{
                                                    ...styles.input, appearance: 'none',
                                                    color: selectedDate?.display ? 'black' : '#a9a9a9'
                                                }}
                                                type="text"
                                                id="date"
                                                value={selectedDate?.display || "Select a date"}
                                                onClick={handleDateInputClick}
                                                readOnly
                                            />
                                            <img
                                                src="src/images/vector.png"
                                                alt="Dropdown Icon"
                                                style={{ ...styles.vecIcon, marginLeft: '-40px', zIndex: 2 }}
                                                onClick={handleDateInputClick}
                                            />
                                        </div>

                                        {/* Time Selection */}
                                        <div style={styles.inputGroup}>

                                            <label style={styles.label} htmlFor="time">Time:</label>
                                            <select
                                                style={{ ...styles.input, appearance: 'none', color: selectedTime ? 'black' : '#a9a9a9' }}
                                                id="time"
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                onFocus={(e) => {
                                                    // When focused, always display in black so options are readable.
                                                    e.target.style.color = 'black';
                                                }}
                                                onBlur={(e) => {
                                                    // When blurred and no option is selected, revert to grey.
                                                    if (!selectedTime) {
                                                        e.target.style.color = '#a9a9a9';
                                                    }
                                                }}
                                            >
                                                <option value="" disabled>Select a time</option>
                                                {timeSlots.map((time) => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            <img
                                                src="src/images/vector.png"
                                                alt="Dropdown Icon"
                                                style={{ ...styles.vecIcon, marginLeft: '-40px', zIndex: 2, pointerEvents: 'none' }}
                                            />
                                        </div>

                                        {/* Doctor Selection */}
                                        <div style={styles.inputGroup}>
                                            <label style={styles.label} htmlFor="doctor">Doctor:</label>
                                            <select
                                                style={{ ...styles.input, appearance: 'none', color: selectedDoctor ? 'black' : '#a9a9a9' }}
                                                id="doctor"
                                                value={selectedDoctor}
                                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                                onFocus={(e) => {
                                                    // When focused, display text in black for readability
                                                    e.target.style.color = 'black';
                                                }}
                                                onBlur={(e) => {
                                                    // Revert to grey if no doctor is selected when blurred
                                                    if (!selectedDoctor) {
                                                        e.target.style.color = '#a9a9a9';
                                                    }
                                                }}
                                            >
                                                <option value="" disabled>Select a doctor</option>
                                                {doctorList.map((doctor) => (
                                                    <option key={doctor} value={doctor}>{doctor}</option>
                                                ))}
                                            </select>
                                            <img
                                                src="src/images/vector.png"
                                                alt="Dropdown Icon"
                                                style={{ ...styles.vecIcon, marginLeft: '-40px', zIndex: 2, pointerEvents: 'none' }}
                                            />
                                        </div>

                                        {/* Gender Selection - show always */}
                                        <div style={styles.inputGroup}>
                                            <label style={styles.label} htmlFor="gender">Gender:</label>
                                            <select
                                                style={{ ...styles.input, appearance: 'none', color: selectedSex ? 'black' : '#a9a9a9' }}
                                                id="gender"
                                                value={selectedSex}
                                                onChange={(e) => setSelectedSex(e.target.value)}
                                                onFocus={(e) => {
                                                    // Set text color to black on focus for clarity
                                                    e.target.style.color = 'black';
                                                }}
                                                onBlur={(e) => {
                                                    // If no valid selection is made, revert to light grey
                                                    if (!selectedSex) {
                                                        e.target.style.color = '#a9a9a9';
                                                    }
                                                }}
                                            >
                                                <option value="" disabled>Select a gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <img
                                                src="src/images/vector.png"
                                                alt="Dropdown Icon"
                                                style={{ ...styles.vecIcon, marginLeft: '-40px', zIndex: 2, pointerEvents: 'none' }}
                                            />
                                        </div>


                                        {/* Confirm Button */}
                                        <button style={styles.button} type="submit">Confirm</button>
                                    </form>
                                </>
                            ) : (
                                <div style={styles.confirmation}>
                                    <p>You have scheduled an appointment with</p>
                                    <h2 style={styles.bookingDetails}>{selectedDoctor}</h2>
                                    <h3 style={styles.bookingDetails}>{selectedDate?.display}, {selectedTime}</h3>
                                    <p style={styles.location}>
                                        <span style={styles.locationIcon}>📍</span> B2-3-7
                                    </p>
                                    <button style={styles.backButton} onClick={handleBack}>Back</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar Popup */}
            {showCalendarPopup && (
                <div style={styles.popupOverlay} onClick={() => setShowCalendarPopup(false)}>
                    <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                        <AptCalendar
                            onClose={() => setShowCalendarPopup(false)}
                            onSelectDate={handleDateSelect}
                            selectedDate={selectedDate ? new Date(selectedDate.value) : null}
                        />
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

const styles = {
    wrapper: {
        maxWidth: '1440px',
        minHeight: '65.1vh',
        marginTop: '125px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        display: 'flex',
    },
    profileContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        width: '100%',
        margin: 'auto',
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
        marginLeft: '-80px'
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#000',
        flex: '0 0 40%',
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        padding: '10px 10px 10px 15px',
        fontSize: '14px',
        borderRadius: '15px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
        color: 'black',
        flex: '1',
        minWidth: '350px',
        marginBottom: '20px',
        cursor: 'pointer'
    },
    vecIcon: {
        cursor: 'pointer',
        marginBottom: '18px',
        width: '10px',
        height: '6px',
    },
    notice: {
        fontSize: '12px',
        color: 'red',
        textAlign: 'right',
        marginTop: '-25px',
        marginBottom: '15px'
    },
    button: {
        width: '180px',
        height: '50px',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'rgba(177, 46, 52)',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        textAlign: 'center',
        display: 'block',
        margin: '0 auto',
        marginTop: '20px',
        marginBottom: '20px',
        transition: 'opacity 0.3s',
    },
    confirmation: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#000'
    },
    bookingDetails: {
        fontWeight: 'bold',
        fontSize: '26px',
        margin: '12px'
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '30px',
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#B12E34',
        margin: '30px'
    },
    locationIcon: {
        marginRight: '10px'
    },
    backButton: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#B12E34',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
    },
}

export default Appointment;