import { Box, Text, VStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDermSignup from "../hooks/useDermSignup";

const DermSignup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    licenseNumber: "",
    gender: "",
    contactNumber: "",
  });

  const navigate = useNavigate();
  const { loading, error, signup } = useDermSignup();

  const handleSignup = async () => {
    try {
      await signup(inputs);
      navigate('/admin/dermatologists'); 
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      minH="100vh" // Full viewport height
      w="100%"
      bg="#ffefef"
    >
      <Box 
        boxShadow="md"
        borderRadius="20px"
        w="500px"
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        p={14}
      >
        <VStack spacing={5} w="100%">
          <Text fontWeight="bold" fontSize={28} mb={6}>
            Add New Dermatologist
          </Text>

          <Input
            placeholder="Enter email"
            pl={4}
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          <Input
            placeholder="Enter full name"
            pl={4}
            type="text"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          <Input
            placeholder="Enter license number"
            pl={4}
            type="text"
            value={inputs.licenseNumber}
            onChange={(e) => setInputs({ ...inputs, licenseNumber: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          <Input
            placeholder="Enter gender"
            pl={4}
            type="text"
            value={inputs.gender}
            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          <Input
            placeholder="Enter contact number"
            pl={4}
            type="tel"
            value={inputs.contactNumber}
            onChange={(e) => setInputs({ ...inputs, contactNumber: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          <Input
            placeholder="Enter password"
            pl={4}
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          <Input
            placeholder="Confirm password"
            pl={4}
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            borderRadius={20}
            h="45px"
            fontSize={14}
            _focus={{ borderColor: "#b12e34" }}
            mb={1}
          />

          {error && (
            <Text color="red" fontSize="sm">
              {error.message || "An error occurred. Please try again."}
            </Text>
          )}

          <Button
            h="45px"
            mt={2}
            px={5}
            py={4}
            borderRadius={20}
            bg="#b12e34"
            color="white"
            fontSize={14}
            fontWeight="bold"
            _hover={{ opacity: 0.7 }}
            isLoading={loading}
            onClick={handleSignup}
          >
            Add Dermatologist
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default DermSignup;