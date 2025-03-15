import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ConsentPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleAgree = () => {
        if (!isChecked) {
            alert("Please read and check the consent box to continue");
            return;
        }

        navigate('/upload');
    };

    const handleDisagree = () => {
        // Simply navigate back to login
        navigate('/');
    };

    return (
        <>
            <Header />
            <div style={styles.pageContainer}>
                <div style={styles.contentWrapper}>
                    <h2 style={styles.title}>Consent Form</h2>
                    
                    <div style={styles.content}>
                        <p style={styles.paragraph}>
                            Welcome to Skinthesis. Before proceeding, please read and agree to the following terms:
                        </p>

                        <div style={styles.scrollableText}>
                            <h3 style={styles.contentTitle}>Terms of Use and Privacy Notice</h3>
                            <p>1. Purpose of the System</p>
                            <br />
                            <p>This system is designed to assist in the early detection of skin cancer through image analysis and professional medical consultation.</p>
                            <br />
                            <p>2. Data Collection and Usage</p>
                            <br />
                            <p>We collect and store:</p>
                       
                            <ul>
                                <li>Personal information you provide</li>
                            
                                <li>Images of skin lesions you upload</li>
                         
                                <li>Medical history and appointment details</li>
                            </ul>
                            <br />
                            <p>3. Medical Disclaimer</p>
                            <br />
                            <p>This system is not a replacement for professional medical diagnosis. All results should be confirmed by healthcare professionals.</p>
                            <br />
                            <p>4. Privacy Protection</p>
                            <br />
                            <p>Your data is protected and will only be shared with your assigned healthcare providers.</p>
                            <br />
                            <p>5. User Rights</p>
                            <br />
                            <p>You have the right to:</p>
                         
                            <ul>
                                <li>Access your personal data</li>

                                <li>Request data correction</li>

                                <li>Withdraw consent at any time</li>
                            </ul>
                        </div>

                        <div style={styles.checkboxContainer}>
                            <input 
                                type="checkbox" 
                                id="consent" 
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                style={styles.checkbox}
                            />
                            <label htmlFor="consent" style={styles.checkboxLabel}>
                                I have read and agree to the terms and conditions
                            </label>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button 
                                onClick={handleAgree}
                                style={{
                                    ...styles.button,
                                    ...styles.agreeButton,
                                    opacity: isChecked ? 1 : 0.5
                                }}
                                disabled={!isChecked}
                            >
                                I Agree
                            </button>
                            <button 
                                onClick={handleDisagree}
                                style={{...styles.button, ...styles.disagreeButton}}
                            >
                                I Disagree
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '80px 20px',
    },
    contentWrapper: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#B12E34',
        marginBottom: '30px',
        fontSize: '28px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    paragraph: {
        fontSize: '16px',
        lineHeight: '2',
        color: '#333',
        marginBottom: '20px',
    },
    scrollableText: {
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '2',
        backgroundColor: '#f9f9f9',
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '20px 0',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    checkbox: {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
    },
    checkboxLabel: {
        fontSize: '15px',
        color: '#333',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
    },
    button: {
        padding: '12px 40px',
        borderRadius: '25px',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: 'bold',
    },
    agreeButton: {
        backgroundColor: '#B12E34',
        color: 'white',
        '&:hover': {
            backgroundColor: '#8e252a',
        },
    },
    disagreeButton: {
        backgroundColor: '#e0e0e0',
        color: '#333',
        '&:hover': {
            backgroundColor: '#d0d0d0',
        },
    },
    contentTitle: {
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

export default ConsentPage; 