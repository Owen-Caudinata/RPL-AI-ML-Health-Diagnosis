import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, SimpleGrid, Image, Skeleton } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const Blog = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/blog/get-all-published', {
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
                setIsLoading(false);

            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [auth.token]);

    if (isLoading) {
        return (
            <Box textAlign="center" mt={32}>
                <Spinner size="xl" />
                <Text mt={4}>Loading...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={32}>
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={32}>
            {data.map((item, index) => (
                <Box key={index} bg="white" p={4} shadow="md" borderRadius="md">
                    <Image src={"https://images.unsplash.com/photo-1716141456685-e9714cdd2808?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Placeholder" borderRadius="md" mb={4} />
                    <Text fontWeight="bold" mb={2}>{item.title}</Text>
                    <Text mb={2}>Author: {item.author}</Text>
                    <Text mb={2}>Category: {item.category}</Text>
                    <Text>Description: {item.content}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default Blog;
