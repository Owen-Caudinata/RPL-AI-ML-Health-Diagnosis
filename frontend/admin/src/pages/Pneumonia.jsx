import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const Pneumonia = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/ehr/get-all', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        auth.logOut()
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

    return (
        <Box>
            Pneumonia Inference
        </Box>
    );
};

export default Pneumonia;
