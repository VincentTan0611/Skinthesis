import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth } from '../../firebase/firebase';
import { firestore } from '../../firebase/firebase';
import { setDoc } from 'firebase/firestore';

function UploadImage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setError(null); // Clear previous errors
        } else {
            setError('Please select a valid image file (jpeg or png).');
        }
    };

    const handleDragOver = (event) => event.preventDefault();
    
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setError(null);
        } else {
            setError('Invalid file format. Please upload a JPEG or PNG image.');
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreview(null);
        setError(null);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleScan = async () => {
        if (!selectedFile) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Convert image to base64
            const base64Image = await convertToBase64(selectedFile);
            
            const formData = new FormData();
            formData.append("file", selectedFile);

            console.log("Uploading file to Flask...");
            const response = await fetch("http://localhost:5001/predict", {
                method: "POST",
                body: formData,
            });

            const responseText = await response.text();
            console.log("Server response:", responseText);

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} - ${responseText}`);
            }

            const data = JSON.parse(responseText);
            
            // Save to Firestore as array in user document
            const userId = auth.currentUser?.uid;
            if (userId) {
                const userDocRef = doc(firestore, "users", userId);
                
                // Create scan data object
                const scanData = {
                    skinLesionPicUrl: base64Image,
                    prediction: data.prediction,
                    confidence: data.confidence,
                    timestamp: new Date().toISOString(),
                    fileName: selectedFile.name
                };

                // Get current user document
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    // Update existing document with new scan in scans array
                    await updateDoc(userDocRef, {
                        scans: arrayUnion(scanData)
                    });
                } else {
                    // Create new document with scans array
                    await setDoc(userDocRef, {
                        scans: [scanData]
                    });
                }
                
                console.log("Scan saved to user's scans array");
            }

            navigate("/result", {
                state: {
                    prediction: data.prediction,
                    confidence: data.confidence,
                    image: preview,
                    fileName: selectedFile.name,
                }
            });
        } catch (error) {
            console.error("Error scanning the image:", error);
            setError(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'white',
        }}>
            <Header />
            <main style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '90px',
            }}>
                <div style={{
                    backgroundColor: '#ffeef0',
                    padding: '40px',
                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.1)',
                    width: '1000px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    gap: '40px', 
                }}>
                    <div style={{
                        border: '1.5px dashed #000000',
                        borderRadius: '20px',
                        padding: '70px 40px',
                        backgroundColor: '#fff',
                        flex: 1,      
                        width: "350px", 
                       
                    }}
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}
                    >
                        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="src/images/uploadimg.png" alt="Upload Icon" style={{ height: '70px', paddingBottom: '10px'}} />
                        </p>
                        <p style={{ color: 'black', paddingTop: '20px' }}>Drag and drop files here to upload</p>
                        <p style={{ color: 'black', padding: '20px' }}>or</p>
                        <label htmlFor="fileInput" style={{
                            color: '#b12e34',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}>
                            Browse
                        </label>
                        <input id="fileInput" type="file" accept="image/jpeg, image/png" style={{ display: 'none' }} onChange={handleFileChange} />
                        <p style={{ fontSize: '12px', color: '#666', paddingTop: '20px', }}>Supported files: JPG, JPEG, PNG</p>
                    </div>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}>
                        {selectedFile ? (
                            <>
                                <h3 style={{ margin: '0', fontSize: '16px', color: 'black', fontWeight: 'bold' }}>Uploaded File</h3>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    width: '100%',
                                    padding: '10px'
                                }}>
                                    <img src={preview} alt="Uploaded File" style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'contain',
                                    }} />
                                    <span style={{ fontSize: '14px', color: '#333' }}>
                                        {selectedFile.name}
                                    </span>
                                    <button onClick={handleRemoveFile} style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        color: '#e63946',
                                    }}>
                                        🗑️
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p style={{ fontSize: '14px', color: '#999' }}>No file uploaded</p>
                        )}
                        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                        <button 
                            onClick={handleScan} 
                            disabled={isLoading}
                            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                            onMouseLeave={(e) => e.target.style.opacity = "1"}
                            style={{
                                backgroundColor: '#b12e34',
                                fontWeight: 'bold',
                                color: 'white',
                                border: 'none',
                                padding: '10px 25px',
                                borderRadius: '15px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        >
                            {isLoading ? 'Scanning...' : 'Scan Image'}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default UploadImage;