import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm2 from "../../../components/AuthForm2";


const AuthPage2 = () => {
	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4} bg="rgba(255, 239, 240, 1)">
			<Container maxW={"container.md"} padding={1}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					{/* Left hand-side */}
					<Box display={{ base: "none", md: "block" }}>
						<Image src='/logoname.png' h={300} />
                    
					</Box>

					{/* Right hand-side */}
					<VStack spacing={500} align={"stretch"}>
                    <AuthForm2/>
						
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage2;