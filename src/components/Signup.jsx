import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../src/hooks/useSignUpWithEmailAndPassword";


const Signup = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { loading, signup, error } = useSignUpWithEmailAndPassword();
	const [errorMessage, setErrorMessage] = useState("");
	

	// Validation before submission
	const handleSignup = () => {
		if (!inputs.email.includes("@")) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}
		if (inputs.password.length < 6) {
			setErrorMessage("Password must be at least 6 characters long.");
			return;
		}
		if (inputs.password !== inputs.confirmPassword) {
			setErrorMessage("Passwords do not match.");
			return;
		}
		setErrorMessage(""); // Clear previous errors
		signup(inputs);
	};

	return (
		<VStack spacing={4}>
			<Input
				placeholder="Email"
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
				aria-label="Email address"
				_focus={{ borderColor: "#b12e34" }}
			/>
			<Input
				placeholder="Password"
				borderRadius={20}
				w="350px"
				h="45px"
				mt={0}
				mb={1}
				pl={5}
				fontSize={14}
				type="password"
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				aria-label="Password"
				_focus={{ borderColor: "#b12e34" }}
			/>
			<Input
				placeholder="Confirm Password"
				borderRadius={20}
				w="350px"
				h="45px"
				mb={4}
				pl={5}
				fontSize={14}
				type="password"
				value={inputs.confirmPassword}
				onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
				aria-label="Confirm Password"
				_focus={{ borderColor: "#b12e34" }}
			/>
			{errorMessage && (
				<Text fontSize={12} color="red.500">
					{errorMessage}
				</Text>
			)}
			{error && (
				<Text fontSize={12} color="red.500">
					{error}
				</Text>
			)}

			<Button
				p={5}
				borderRadius={10}
				fontWeight="bold"
				bg="#b12e34"
				fontSize={14}
				isLoading={loading}
				onClick={handleSignup}
				disabled={loading}
				_hover={{ opacity: 0.7 }}
			>
				Sign up
			</Button>
		</VStack>
	);
};

export default Signup;