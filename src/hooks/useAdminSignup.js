import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useAdminSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signup = async (inputs) => {
    const { email, password, confirmPassword } = inputs;

    if (!email || !password || !confirmPassword ) {
      setError({ message: "Please fill in all fields" });
      return;
    }

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }


    setLoading(true);
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create admin document in Firestore
      await setDoc(doc(firestore, "admin", userCredential.user.uid), {
        email, 
        role: "admin",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      navigate("/admindashboard");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signup };
};

export default useAdminSignup; 