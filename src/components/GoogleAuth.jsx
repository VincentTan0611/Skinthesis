import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser) {
        if (error) console.error("Error: ", error.message);
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Login existing user
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // Signup new user with default fields
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          fullName: newUser.user.displayName || "", // Default to empty if missing
          profilePicUrl: newUser.user.photoURL || "", // Use Google profile picture
      
        };

        await setDoc(userRef, userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
      <Image src="/google.png" h={5} alt="Google logo" mr={3}/>
      <Text color={"#b12e34"} fontSize={14} _hover={{ textDecoration: "underline" }}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
