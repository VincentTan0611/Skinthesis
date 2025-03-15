import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../../components/AuthForm";


const AuthPage = () => {
	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4} bg="rgba(255, 239, 240, 1)">
			<Container maxW={"container.md"} padding={1}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					{/* Left hand-side */}
					<Box display={{ base: "none", md: "block" }}>
						<Image src='/logoname.png' h={300} />
                    
					</Box>

					{/* Right hand-side */}
					<VStack spacing={410} align={"stretch"}>
                    <AuthForm/>
						
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;