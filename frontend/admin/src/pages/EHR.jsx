import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EHR = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + '/ehr/get-all', { //TODO: CHANGE API URL
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

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg">
            {data.map((item, index) => (
                <Box key={index} mb={4} p={2} borderWidth="1px" borderRadius="md">
                    {Object.entries(item).map(([key, value]) => (
                        <Box key={key}>
                            <strong>{key}:</strong> {value}
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default EHR;
