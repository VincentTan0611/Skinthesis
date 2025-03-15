import { Box, Button, Text, VStack, Image, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import name from "../../../images/name.png";
import logo from "../../../images/logo.png";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="#ffefef"
    >
      <Box textAlign="left" alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold" color="#b12e34">
          Welcome to
        </Text>
        <HStack spacing={6} alignItems="flex-end">
          <Image src={name} alt="Skinthesis" height="60px" />
          <Image src={logo} alt="Logo" height="80px"  ml={4} />
        </HStack>
      </Box>

      <Box textAlign="center" alignItems="center">
        <Text fontSize="md" fontWeight="medium" mt={14} mb={2}>
          Are you a Dermatologist or User?
        </Text>
        <VStack spacing={6} width="100%">
          <Button
            width="250px"
            bg="#b12e34"       
            _hover={{ opacity: 0.7 }}                   
            borderRadius="12px"
            onClick={() => navigate("/authpagederma")} 
          >
            <Text fontWeight="bold">
              Dermatologist
            </Text>
          </Button>
          <Button
            width="250px"
            bg="#b12e34"       
            _hover={{ opacity: 0.7 }}                   
            borderRadius="12px"
            onClick={() => navigate("/authpage")}
            >
            <Text fontWeight="bold">
              User
            </Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SelectRole;
