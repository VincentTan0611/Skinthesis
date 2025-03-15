import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../../store/userProfileStore";

const useGetUserProfileByEmail = (email) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching profile for email:", email);
        
        const q = query(
          collection(firestore, "users"), 
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No user found with email:", email);
          setUserProfile(null);
          return;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log("Fetched user data:", userData);
       

        setUserProfile({
          id: userDoc.id,
          ...userData
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      getUserProfile();
    }
  }, [email, setUserProfile]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByEmail;
