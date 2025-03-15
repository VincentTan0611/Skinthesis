import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import useAdminSignup from "../hooks/useAdminSignup";

const AdminSignup = ({ setIsLogin }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, signup } = useAdminSignup();

  return (
    <>
      <Input
        placeholder="Enter your email"
        borderRadius={20}
        w="350px"
        h="45px"
        mt={8}
        mb={1}
        pl={5}
        fontSize={14}
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        _focus={{ borderColor: "#b12e34" }}
      />
     
      <Input
        placeholder="Enter your password"
        borderRadius={20}
        w="350px"
        h="45px"
        mb={1}
        pl={5}
        fontSize={14}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        _focus={{ borderColor: "#b12e34" }}
      />
      <Input
        placeholder="Confirm your password"
        borderRadius={20}
        w="350px"
        h="45px"
        mb={4}
        pl={5}
        fontSize={14}
        type="password"
        value={inputs.confirmPassword}
        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
        _focus={{ borderColor: "#b12e34" }}
      />

      {error && (
        <Text color="red" fontSize="sm" mt={2}>
          {error.message || "An error occurred. Please try again."}
        </Text>
      )}
      
      <Button
        p={5}
        borderRadius={10}
        fontWeight="bold"
        bg="#b12e34"
        fontSize={14}
        color="white"
        isLoading={loading}
        onClick={() => {
          console.log("Admin Signup button clicked");
          signup(inputs);
        }}
        _hover={{ opacity: 0.7 }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AdminSignup; 