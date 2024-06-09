import React, { useState } from 'react';
import { Checkbox, Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const AddEHR = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({ name: '', manufacturer: '', category: '', description: '', published: false });
    const auth = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(mainApiUrl + '/drug/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    name: 'Success',
                    description: 'Data added successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                navigate(-1);
                // Clear the form data
                setFormData({});

            } else {
                const errorMessage = await response.text();
                console.error('Error adding data:', errorMessage);
                toast({
                    name: 'Error',
                    description: `Error adding data: ${errorMessage}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                name: 'Error',
                description: `Error submitting form: ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="manufacturer">Manufacturer</FormLabel>
                <Input
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    value={formData.manufacturer}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="published">Published</FormLabel>
                <Checkbox
                    id="published"
                    name="published"
                    isChecked={formData.published}
                    onChange={(e) => handleChange(e)}
                >
                    Is Published
                </Checkbox>
            </FormControl>
            <Button type="submit">Add Data</Button>
        </Box>
    );
};

export default AddEHR;
