import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (inputs) => {
    const { email, password } = inputs;
    
    if (!email || !password) {
      setError({ message: "Please fill in all fields" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check if user is an admin
      const userDoc = await getDoc(doc(firestore, "admin", userCredential.user.uid));
      const userData = userDoc.data();

      if (userData?.role !== "admin") {
        await auth.signOut();
        setError({ message: "Access denied. Admin privileges required." });
        return;
      }

      navigate("/admindashboard");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useAdminLogin; 