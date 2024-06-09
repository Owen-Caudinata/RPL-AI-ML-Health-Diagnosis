import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const Feedback = () => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const auth = useAuth();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(mainApiUrl + '/feedback/create', { //TODO: CHANGE API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: 'Feedback sent successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                console.error('Error adding data:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} mt={32}>
            <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Input
                    id="content"
                    name="content"
                    type="text"
                    value={formData.content}
                    onChange={handleChange}
                />
            </FormControl>

            <Button type="submit" mt={4} colorScheme="teal">Add Data</Button>
        </Box>
    );
};

export default Feedback;
