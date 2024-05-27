import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
    Spinner,
    Heading,
    Text
} from "@chakra-ui/react";

import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const Chat = () => {
    const apiUrl = "http://localhost:8000/chat";

    const auth = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [chatHistory, setChatHistory] = useState([]);
    const [inputText, setInputText] = useState("");
    const [role, setRole] = useState("");


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


            const chain = new RemoteRunnable({
                url: `http://localhost:8000/chat`,
            });

            const result = await chain.invoke({ text: inputText });

            // const result = await response.json();

            console.log(result);

            const newAIMessage = {
                "content": result.content,
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

    return (
        <Box className="container" p={8} display="flex" flexDirection="column" justifyContent="space-between" minHeight="90vh">
            <HStack justifyContent="space-between" alignItems="center" bg="teal.500" p={4} borderRadius="xl">
                <Heading as="h1" size="lg" color="white">Healthcare Chatbot</Heading>
                <Button onClick={() => auth.logOut()} colorScheme="teal" bg="teal.700" color="white">
                    Logout
                </Button>
            </HStack>


            {chatHistory.length > 0 ? (
                <Box bg="white" borderRadius="md" p={8} mb={16} height="500px" overflowY="auto">
                    <VStack spacing={4} align="stretch">
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
                <Box display="flex" justifyContent="center" alignItems="center" border="solid red" height="60vh">
                    <Heading as="h1" size="2xl" color="gray.800">Ask Doc.ai</Heading>
                </Box>
            )}

            <Box mt={16} mb={8} position="fixed" bottom={0} left={0} right={0} p={4} bg="gray.50" borderTopWidth="1px">
                <FormControl>
                    <Flex>
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
                            flex="1"
                        />
                        <Button
                            onClick={handleSubmitMessage}
                            colorScheme="blue"
                            ml={2}
                            isLoading={loading}
                            disabled={loading}
                        >
                            Send
                        </Button>
                    </Flex>
                </FormControl>
            </Box>
        </Box>
    );
};

export default Chat;