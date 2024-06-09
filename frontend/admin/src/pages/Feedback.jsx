import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, Divider } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const Feedback = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/feedback/get-all', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        auth.logOut();
                        return;
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                }

                const jsonData = await response.json();
                setData(jsonData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Box>
            <Heading as="h1" mb={4}>Feedback</Heading>
            {data.map((item, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
                    {Object.entries(item).map(([key, value]) => (
                        <Box key={key} mb={2}>
                            <Text fontWeight="bold">{key}: </Text>
                            <Text>{value}</Text>
                        </Box>
                    ))}
                    <Divider mt={4} />
                </Box>
            ))}
        </Box>
    );
};

export default Feedback;
