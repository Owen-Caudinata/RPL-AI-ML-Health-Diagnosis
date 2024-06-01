import React, { useState, useEffect } from 'react';
import { Button, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from "react-router-dom";

const Pneumonia = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/pneumonia-report/get', { //TODO: CHANGE API URL
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

   
    return (
        <Box>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th key="id">ID</Th>
                        <Th key="createdAt">Created At</Th>
                        <Th key="updatedAt">Updated At</Th>
                        <Th key="title">Title</Th>
                        <Th key="content">Prediction ID</Th>
                        <Th key="description">Description</Th>
                        <Th key="print">Print</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.id}</Td>
                            <Td>{item.userId}</Td>
                            <Td>{item.createdAt}</Td>
                            <Td>{item.updatedAt}</Td>
                            <Td>{item.predictionId}</Td>
                            <Td>{item.description}</Td>

                            <Td>
                                {/* <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={window.print()}
                                >
                                    Print
                                </Button> */}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default Pneumonia;
