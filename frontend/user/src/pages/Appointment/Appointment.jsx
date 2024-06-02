import React, { useState, useEffect } from 'react';
import { useToast, Box, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
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
        if (confirm('Are you sure you want to delete this record?')) {
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
                        category: `Record with ID ${id} has been deleted.`,
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
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Created At</Th>
                        <Th>Updated At</Th>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Appointment Date</Th>
                        <Th>Status</Th>
                        <Th>Location</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item) => (
                        <Tr key={item.id}>
                            <Td>{item.id}</Td>
                            <Td>{item.createdAt}</Td>
                            <Td>{item.updatedAt}</Td>
                            <Td>{item.title}</Td>
                            <Td>{item.description}</Td>
                            <Td>{new Date(item.appointmentDate).toLocaleString()}</Td> {/* Convert to readable format */}
                            <Td>{item.status}</Td>
                            <Td>{item.location}</Td>
                            <Td>
                                <Button colorScheme="blue" size="sm" onClick={() => onEdit(item.id)}>Edit</Button>
                                <Button colorScheme="red" size="sm" onClick={() => onDelete(item.id)}>Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default Appointment;
