import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, CircularProgress } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider.jsx';

const Login = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box p={4} maxW="400px" width="100%">
                <VStack spacing={4} align="center" as="form" onSubmit={handleSubmitEvent}>
                    <FormControl id="email" w="100%">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" value={input.email} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl id="password" w="100%">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={input.password} onChange={handleInputChange} />
                    </FormControl>
                    <Button colorScheme="blue" w="100%" type="submit" disabled={isLoading}>
                        {isLoading ? <CircularProgress isIndeterminate size="24px" color="white" /> : "Login"}
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Login;
