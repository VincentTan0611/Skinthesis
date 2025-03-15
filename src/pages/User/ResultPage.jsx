import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ResultPage() {
    const location = useLocation();
    const { prediction, confidence, image, fileName } = location.state || {};

    if (!location.state) {
        return <p>No data available. Please upload an image first.</p>;
    }

    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            <Header />

            <main style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: "81vh",  
                paddingTop: "90px",  
            }}>

                {/* Content Box */}
                <div style={{
                    padding: "2rem",
                    borderRadius: "15px",
                    maxWidth: "900px",
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "50px"
                }}>

                    {/* Left Side - Uploaded Image */}
                    <div style={{ 
                        textAlign: "center",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "280px"
                    }}>
                        <p style={{ fontSize: "12px", marginBottom: "10px", color: "#000" }}>
                            {fileName}
                        </p>
                        <img src={image} alt={fileName} style={{
                            width: "250px",
                            height: "250px",
                            objectFit: "cover",
                        }} />
                    </div>

                    {/* Right Side - Diagnosis Result */}
                    <div style={{
                        backgroundColor: "#ffeef0",
                        padding: "2rem",
                        borderRadius: "15px",
                        maxWidth: "600px",
                        textAlign: "center",
                        border: "1px solid black"
                    }}>
                        <h2 style={{ fontSize: "25px", fontWeight: "bold", color: "black", marginBottom: "30px" }}>Result</h2>
                        <p style={{ fontSize: "14px", color: "black" }}>Your lesion is</p>
                        <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#b12e34" }}>
                            {prediction}
                        </h3>
                        {/* Call to Action */}
                        <p style={{ fontSize: "12px", color: "black", margin: "50px 10px" }}>
                            Want to <a href="/appointment" style={{ color: "#b12e34", textDecoration: "underline" }}>schedule an appointment</a> with a dermatologist?
                        </p>

                        {/* Educational Resources */}
                        <div style={{
                            backgroundColor: "#f8dcdd",
                            padding: "20px 28px",
                            borderRadius: "8px",
                            textAlign: "left"
                        }}>
                            <p style={{ fontWeight: "bold", fontSize: "11px", color: "black", marginBottom: "7px" }}>
                                Click the articles below to read more about skin health:
                            </p>
                            <ul style={{ fontSize: "11px", lineHeight: "2.5", color: "#000000" }}>
                                <li><a href="/art4" style={{ color: "#000000", textDecoration: "underline" }}>What are the Different Types of Tumour?</a></li>
                                <li><a href="/art3" style={{ color: "#000000", textDecoration: "underline" }}>How to Prevent Skin Cancer</a></li>
                                <li><a href="/art2" style={{ color: "#000000", textDecoration: "underline" }}>Recognising Skin Cancer in Primary Care</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ResultPage;