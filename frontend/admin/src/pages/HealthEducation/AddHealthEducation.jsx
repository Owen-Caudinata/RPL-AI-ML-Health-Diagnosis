import React, { useState } from 'react';
import { Checkbox, Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';


const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const AddBlog = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({ title: '', content: '', author: '', category: '', published: false });
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
            console.log(formData);

            const response = await fetch(mainApiUrl + '/blog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: 'Data added successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                // Clear the form data
                setFormData({ title: '', content: '', author: '', category: '', published: false });

                navigate(-1);

            } else {
                const errorMessage = await response.text();
                console.error('Error adding data:', errorMessage);
                toast({
                    title: 'Error',
                    description: `Error adding data: ${errorMessage}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: 'Error',
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
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    id="title"
                    name="title" // Corrected from title to name
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Input
                    id="content"
                    name="content" // Corrected from title to name
                    type="text"
                    value={formData.content}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                    id="author"
                    name="author" // Corrected from title to name
                    type="text"
                    value={formData.author}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                    id="category"
                    name="category" // Corrected from title to name
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="published">Published</FormLabel>
                <Checkbox
                    id="published"
                    name="published" // Corrected from title to name
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

export default AddBlog;
