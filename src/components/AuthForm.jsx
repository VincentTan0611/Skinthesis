import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";


const AuthForm = () => {

	const [isLogin, setIsLogin] = useState(true);
	
	return (
		<>
			<Box boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)" borderRadius={25} h="550px" w="430px" bg={"#ffffff"} display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
				<VStack >
				<Text fontWeight="bold" textStyle="xl" fontSize={28}>{isLogin ? "Log In" : "Sign Up"}</Text>
				{isLogin ? <Login /> : <Signup/>}
						 
					<Flex alignItems={"center"} justifyContent={"center"} my={3} w={"full"}>
						<Text fontSize={14}>OR</Text>
					</Flex>

				<GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />	
				</VStack>

				<Flex alignItems={"center"} justifyContent={"center"} mt={14}>
					<Text fontSize={12}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
					<Text onClick={() => setIsLogin(!isLogin)} _hover={{ textDecoration: "underline" }} pl={1} fontSize={12} fontWeight="bold" color="#b12e34" cursor={"pointer"}>{isLogin ? "Register" : "Log In"}</Text>
				</Flex>
			</Box>

					
		</>
	);
};

export default AuthForm;