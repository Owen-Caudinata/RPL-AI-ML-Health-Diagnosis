import React, { useState, useEffect } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from "react-router-dom";


const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EHR = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/ehr/get', { //TODO: CHANGE API URL
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const onEdit = async (id) => {
        navigate(`/ehr/edit/${id}`);
    };

    const onDelete = async (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            try {
                const response = await fetch(mainApiUrl + `/ehr/delete/${id}`, { //TODO: CHANGE API URL
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
        <Box mt={32}>
            <Button as="a" href="/ehr-add" colorScheme="teal" mb={4}>
                Add EHR
            </Button>

            <Box overflowX="auto">
                {data.map((item, index) => (
                    <Box key={index} display="inline-block" p={2} border="1px" borderRadius="md" m={2}>
                        <Box>ID: {item.id}</Box>
                        {/* <Box>Created At: {item.createdAt}</Box>
                        <Box>Updated At: {item.updatedAt}</Box> */}
                        <Box>Title: {item.title}</Box>
                        <Box>Content: {item.content}</Box>
                        <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() => onEdit(item.id)}
                            mr={2}
                        >
                            Edit
                        </Button>
                        <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => onDelete(item.id)}
                        >
                            Delete
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default EHR;
