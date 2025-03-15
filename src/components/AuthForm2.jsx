import { Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";

const AuthForm2 = () => {
	const [isLogin, setIsLogin] = useState(true);
	
	return (
		<>
			<Box boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)" borderRadius={25} h="500px" w="430px" bg={"#ffffff"} display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
				<VStack >
				<Text mx={2} fontWeight="bold" textStyle="xl" fontSize={28}>
					{isLogin ? " Log In" : " Sign Up"}
				</Text>
                {isLogin ? <AdminLogin setIsLogin={setIsLogin} /> : <AdminSignup setIsLogin={setIsLogin} />}
				</VStack>
			</Box>
		</>
	);
};

export default AuthForm2;