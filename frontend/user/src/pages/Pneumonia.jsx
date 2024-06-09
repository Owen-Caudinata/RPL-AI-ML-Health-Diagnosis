import React, { useState, useEffect } from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from "react-router-dom";

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const Pneumonia = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/pneumonia-report/get', { //TODO: CHANGE API URL
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

    const handlePrint = (id) => () => { // Change handlePrint to return a function
        const boxToPrint = document.getElementById(id);
        if (boxToPrint) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Print</title></head><body>');
            printWindow.document.write(boxToPrint.outerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        } else {
            console.error('Box element not found.');
        }
    };

    return (
        <Box mt={32}>
            {data.map((item, index) => (
                <Box key={index} p={4} border="1px" borderRadius="md" m={2} id={item.id}>
                    <Box>ID: {item.id}</Box>
                    <Box>User ID: {item.userId}</Box>
                    <Box>Created At: {item.createdAt}</Box>
                    <Box>Updated At: {item.updatedAt}</Box>
                    <Box>Prediction ID: {item.predictionId}</Box>
                    <Box>Description: {item.description}</Box>
                    <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={handlePrint(item.id)} // Pass a function reference
                        mt={2}
                    >
                        Print
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default Pneumonia;
