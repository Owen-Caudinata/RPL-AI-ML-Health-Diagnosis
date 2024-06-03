import React, { useState, useEffect } from 'react';
import { useToast, Box, Button, Table, Thead, Tbody, Tr, Th, Td, Checkbox } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from "react-router-dom";

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;


const DailyNewsletter = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/blog/get-all', {
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
    }, []);

    const onEdit = async (id) => {
        navigate(`/blog/edit/${id}`);
    };

    const onDelete = async (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            try {
                const response = await fetch(mainApiUrl + `/blog/delete/${id}`, {
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
                    }); // fix
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
            <Button as="a" href="/blog/add" colorScheme="teal" mb={4}>
                Add Blog
            </Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th key="id">ID</Th>
                        <Th key="createdAt">Created At</Th>
                        <Th key="updatedAt">Updated At</Th>
                        <Th key="title">Title</Th>
                        <Th key="content">Content</Th>
                        <Th key="author">Author</Th>
                        <Th key="category">Category</Th>
                        <Th key="published">Published</Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.id}</Td>
                            <Td>{item.createdAt}</Td>
                            <Td>{item.updatedAt}</Td>
                            <Td>{item.title}</Td>
                            <Td>{item.content}</Td>
                            <Td>{item.author}</Td>
                            <Td>{item.category}</Td>
                            <Td><Checkbox isChecked={item.published} isReadOnly>
                                Published
                            </Checkbox></Td>

                            <Td>
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() => onEdit(item.id)}
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
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default DailyNewsletter;
