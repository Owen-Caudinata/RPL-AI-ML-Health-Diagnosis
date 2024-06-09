import React, { useState, useEffect } from 'react';
import { useToast, Box, Button, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from "react-router-dom";

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const Appointment = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/appointment/get', {
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
    }, [auth.token]); // Added auth.token as a dependency to useEffect

    const onEdit = async (id) => {
        navigate(`/appointment/edit/${id}`);
    };

    const onDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                const response = await fetch(mainApiUrl + `/appointment/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                if (response.ok) {
                    setData(data.filter(item => item.id !== id)); // Remove the deleted item from the state
                    toast({
                        title: 'Record deleted.',
                        description: `Record with ID ${id} has been deleted.`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    console.error('Error deleting data:', await response.text());
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };

    return (
        <Box>
            <Button as="a" href="/appointment-add" colorScheme="teal" mb={4} mt={16}>
                Add Appointment
            </Button>
            {data.map((item) => (
                <Box key={item.id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                    <Text fontWeight="bold">ID: {item.id}</Text>
                    <Text>Created At: {item.createdAt}</Text>
                    <Text>Updated At: {item.updatedAt}</Text>
                    <Text>Title: {item.title}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Appointment Date: {new Date(item.appointmentDate).toLocaleString()}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>Location: {item.location}</Text>
                    <Button colorScheme="blue" size="sm" onClick={() => onEdit(item.id)} mt={2} mr={2}>Edit</Button>
                    <Button colorScheme="red" size="sm" onClick={() => onDelete(item.id)} mt={2}>Delete</Button>
                </Box>
            ))}
        </Box>
    );
};

export default Appointment;
