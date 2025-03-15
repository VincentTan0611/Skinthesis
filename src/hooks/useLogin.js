import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../../store/authStore";

const useLogin = () => {
  const [signInWithEmailAndPassword, , loading, rawError] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

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
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
          loginUser(docSnap.data());
        } else {
          console.error("User document not found in Firestore.");
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

export default useLogin;
