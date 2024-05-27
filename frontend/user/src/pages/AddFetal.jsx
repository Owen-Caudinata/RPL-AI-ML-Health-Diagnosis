import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Checkbox, Button, Stack, Textarea } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const MyForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <Box
            as="form"
            onSubmit={handleSubmit}
            p={6}
            boxShadow="md"
            borderRadius="md"
            bg="white"
            maxW="md"
            width="100%"
        >
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the title"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <Textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Enter the content"
                    />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <Checkbox
                        id="published"
                        name="published"
                        isChecked={formData.published}
                        onChange={(e) => handleChange({ target: { name: 'published', value: e.target.checked } })}
                    >
                        Is Published
                    </Checkbox>
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg">
                    Add Data
                </Button>
            </Stack>
        </Box>
    );
};

const AddFetal = () => {
    const [formData, setFormData] = useState({ title: '', content: '', published: false });
    const auth = useAuth();

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
            const response = await fetch('http://localhost:3000/fetal/create', { // TODO: CHANGE API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Data added successfully');
            } else {
                console.error('Error adding data:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bg="gray.100"
        >
            <MyForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </Box>
    );
};

export default AddFetal;
