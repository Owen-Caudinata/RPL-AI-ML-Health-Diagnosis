import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input, Box, FormControl, FormLabel, Checkbox, Button, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EditEHR = () => {
    const auth = useAuth();
    const { id } = useParams();
    const toast = useToast();
    const [formData, setFormData] = useState({ title: '', description: '', appointmentDate: '', status: '', location: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + `/appointment/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    const errorMessage = await response.text();
                    console.error('Error fetching data:', errorMessage);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, auth.token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            formData.appointmentDate = new Date(formData.appointmentDate)
            const response = await fetch(mainApiUrl + `/appointment/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: 'Data updated successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                const errorMessage = await response.text();
                console.error('Error updating data:', errorMessage);
                toast({
                    title: 'Error',
                    description: `Error updating data: ${errorMessage}`,
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
        <Box as="form" onSubmit={handleSave} mt={32}>
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
            <Button type="submit">Save Data</Button>
        </Box>
    );
};

export default EditEHR;
