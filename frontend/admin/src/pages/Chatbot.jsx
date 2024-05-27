import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, HStack, Spinner, Heading, Text } from "@chakra-ui/react";

const Chat = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const auth = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [chatHistory, setChatHistory] = useState([]);
    const [inputText, setInputText] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await fetch(apiUrl + "/users/me/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + auth.token
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                } else {
                    navigate("/login");
                    console.error("User request failed:", userResponse.statusText);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [auth.token, navigate]);

    const handleSubmitMessage = async () => {
        try {
            setLoading(true);

            const newHumanMessage = {
                "content": inputText,
                "additional_kwargs": {},
                "type": "human",
                "example": false
            };

            setChatHistory(prevChatHistory => [...prevChatHistory, newHumanMessage]);

            const response = await fetch(apiUrl + "/invoke", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    input: {
                        input: inputText,
                        role: role,
                        chat_history: chatHistory.slice(0, -1)
                    }
                })
            });

            const result = await response.json();

            const newAIMessage = {
                "content": result.output.output,
                "additional_kwargs": {},
                "type": "ai",
                "example": false
            };

            setChatHistory(prevChatHistory => [...prevChatHistory, newAIMessage]);

            setInputText("");
            setLoading(false);

        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <Box className="container" p={8} display="flex" flexDirection="column" justifyContent="space-between" minHeight="100vh">
            <HStack justifyContent="space-between" alignItems="center" bg="teal.500" p={4} borderRadius="xl">
                <Heading as="h1" size="lg" color="white">Welcome, {user?.full_name}!</Heading>
                <Button onClick={() => auth.logOut()} colorScheme="teal" bg="teal.700" color="white">
                    Logout
                </Button>
            </HStack>

            <FormControl mt={4} mb={4}>
                <FormLabel htmlFor="role">Masukkan Role ChatRec</FormLabel>
                <Input
                    type="text"
                    id="role"
                    placeholder="Role"
                    value={role}
                    onChange={handleRoleChange}
                />
            </FormControl>

            {chatHistory.length > 0 ? (
                <Box bg="white" borderRadius="md" p={8} mb={8}>
                    <VStack spacing={4}>
                        {chatHistory.map((message, index) => (
                            <HStack
                                key={index}
                                w="full"
                                justifyContent={message.type === 'ai' ? 'flex-start' : 'flex-end'}
                            >
                                <Box bg="gray.200" p={4} borderRadius="md" maxW="lg">
                                    <Text fontWeight="bold" color="gray.800">
                                        {message.type === 'ai' ? 'ChatRec' : 'Human'}
                                    </Text>
                                    <Text>{message.content}</Text>
                                </Box>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" h="full">
                    <Heading as="h1" size="2xl" color="gray.800">Ask ChatRec</Heading>
                </Box>
            )}

            <Box mt={8} mb={8} position="fixed" bottom={0} left={0} right={0} p={4} bg="gray.50" borderTopWidth="1px">
                <FormControl>
                    <Textarea
                        id="chat"
                        value={loading ? "" : inputText}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmitMessage();
                            }
                        }}
                        rows={1}
                        placeholder="Your message..."
                    />
                </FormControl>
                <HStack justifyContent="flex-end" mt={2}>
                    {loading ? (
                        <Spinner size="lg" />
                    ) : (
                        <Button
                            onClick={handleSubmitMessage}
                            colorScheme="blue"
                        >
                            Send
                        </Button>
                    )}
                </HStack>
            </Box>
        </Box>
    );
};
export default Chat;
