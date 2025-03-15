import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import useAuthStore from "../../store/authStore";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
    const loginUser = useAuthStore(state => state.login)
    
    const signup = async (inputs) => {
        // Check all fields are filled
        if (!inputs.email || !inputs.password) {
            console.log("Please fill all the fields");
            return;
        }

        try {
            // Create user with email and password
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (error) {
                console.log("Error creating user:", error.message);
                return;
            }

            // Check if the user was created successfully
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    fullName: "",
                    profilePicUrl: "",
                  

                };
                
                // Set document in Firestore
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

                // Confirm save
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);

            }
        } catch (error) {
            console.log("An error occurred during signup:", error.message);
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
