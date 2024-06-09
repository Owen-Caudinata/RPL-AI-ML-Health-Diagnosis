import React, { useState } from 'react';
import { Checkbox, Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const AddAppointment = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({ title: '', description: '', appointmentDate: '', status: '', location: '' });
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
            formData.appointmentDate = new Date(formData.appointmentDate);

            const response = await fetch(mainApiUrl + '/appointment/create', {
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
                navigate(-1);

                // Clear the form data
                setFormData({ title: '', description: '', appointmentDate: '', status: '', location: '' });

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
        <Box as="form" onSubmit={handleSubmit} mt={32}>
            <FormControl>
                <FormLabel htmlFor="title">Appointment Name</FormLabel>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
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
                <FormLabel htmlFor="appointmentDate">Appointment Date</FormLabel>
                <Input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Input
                    id="status"
                    name="status"
                    type="text"
                    value={formData.status}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                />
            </FormControl>
            <Button type="submit">Add Data</Button>
        </Box>
    );
};

export default AddAppointment;
