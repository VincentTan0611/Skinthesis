import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useDermSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.confirmPassword || 
        !inputs.fullName || !inputs.licenseNumber || !inputs.gender || 
        !inputs.contactNumber) {
      setError({ message: "All fields are required" });
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      if (userCredential) {
        // Create user document in Firestore
        const userDoc = {
          uid: userCredential.user.uid,
          email: inputs.email,
          fullName: inputs.fullName,
          licenseNumber: inputs.licenseNumber,
          gender: inputs.gender,
          contactNumber: inputs.contactNumber,
          role: "dermatologist",
          createdAt: new Date().toISOString(),
          profilePicURL: "",
          verified: false,
        };

        // Save to Firestore
        await setDoc(doc(firestore, "dermatologists", userCredential.user.uid), userDoc);

        // Update local storage and state
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        
        // Navigate to dashboard
        navigate("/dermatologist/dashboard");
      }
    } catch (error) {
      let errorMessage = "An error occurred during signup";
      
      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already registered";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      }
      
      setError({ message: errorMessage });
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signup };
};

export default useDermSignup; 