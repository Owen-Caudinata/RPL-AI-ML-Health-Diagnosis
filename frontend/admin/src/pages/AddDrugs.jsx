import React, { useState } from 'react';
import { Checkbox, Box, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const AddEHR = () => {
    const [formData, setFormData] = useState({ nameDrugs: '', category: '', description: '' });
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
            const response = await fetch('http://localhost:3000/Drugs/create', {
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
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel htmlFor="nameDrugs">nameDrugs</FormLabel>
                <Input
                    id="nameDrugs"
                    name="nameDrugs"
                    type="text"
                    value={formData.nameDrugs}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="category">category</FormLabel>
                <Input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="description">description</FormLabel>
                <Input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                />
            </FormControl>
            <Button type="submit">Add Data</Button>
        </Box>
    );
};

export default AddEHR;
