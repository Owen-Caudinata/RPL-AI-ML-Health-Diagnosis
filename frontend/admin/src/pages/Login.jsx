import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, CircularProgress, Heading } from "@chakra-ui/react"; // Added Heading import
import { useAuth } from "../hooks/AuthProvider.jsx";
import { Logo } from "../components/Logo.jsx"

const Login = () => {
  // Accessing authentication context
  const auth = useAuth();

  // State variables
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

 
  // Function to handle form submission
  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    // Input validation
    if (input.email.trim() === "" || input.password.trim() === "") {
      alert("Please provide valid input for both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await auth.loginAction(input);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login. Please try again.");
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position="relative" overflow="hidden">
      {/* Background box */}
      <Box
        id="background-box"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        // bgGradient="linear(to-r, #F5F5F5, #D3D3D3)" // Changed gradient color to light grey
        transition="opacity 0.3s ease"
        pointerEvents="none" // Ensure background box doesn't interfere with form interaction
      />

      {/* Designs on background */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: -1 }}>
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,229.3C672,224,768,160,864,160C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* Login form */}
      <Box p={4} maxW="400px" width="100%">
        <VStack spacing={4} align="center" as="form" onSubmit={handleSubmitEvent}>
          {/* Logo Component */}
          <Logo />
          {/* Heading Component */}
          <Heading as="h1" fontWeight="300" fontSize="24px" letterSpacing="-0.5px">
            Login
          </Heading>
          {/* Email input field */}
          <FormControl id="email" w="100%">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              borderWidth="2px" // Thicker border
              borderRadius="md"
            />
          </FormControl>
          {/* Password input field */}
          <FormControl id="password" w="100%">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              borderWidth="2px" // Thicker border
              borderRadius="md"
            />
          </FormControl>
          {/* Login button with loading spinner */}
          <Button colorScheme="green" w="100%" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress isIndeterminate size="24px" color="white" /> : "Login"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
