import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import useDermAuthStore from "../../store/dermAuthStore";
import { useNavigate } from "react-router-dom";

const useDermLogout = () => {
  const logoutDerma = useDermAuthStore((state) => state.logoutDerma);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      logoutDerma();
      localStorage.removeItem("dermatologist-info");
      localStorage.removeItem("dermatologist");
      console.log("Dermatologist logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return { logout };
};

export default useDermLogout; 