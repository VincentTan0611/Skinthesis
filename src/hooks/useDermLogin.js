import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useDermAuthStore from "../../store/dermAuthStore";
import { useNavigate } from "react-router-dom";

const useDermLogin = () => {
  const [signInWithEmailAndPassword, , loading, rawError] =
    useSignInWithEmailAndPassword(auth);
  const loginDerma = useDermAuthStore((state) => state.loginDerma);
  const navigate = useNavigate();

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      console.error("Email and password are required.");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "dermatologists", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dermatologistData = docSnap.data();
          localStorage.setItem("dermatologist-info", JSON.stringify(dermatologistData));
          loginDerma(dermatologistData);
          console.log("Dermatologist logged in, navigating to patient list");
          navigate("/patientlist");
        } else {
          throw new Error("This account is not registered as a dermatologist.");
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const error = rawError
    ? new Error("Invalid email or password. Please try again.")
    : null;

  return { loading, error, login };
};

export default useDermLogin; 