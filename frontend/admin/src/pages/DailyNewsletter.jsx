import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const DailyNewsletter = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/daily-newsletter/get-all', {
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
        <Table variant="simple">
            <Thead>
                <Tr>
                    {data.length > 0 &&
                        Object.keys(data[0]).map((key) => (
                            <Th key={key}>{key}</Th>
                        ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item, index) => (
                    <Tr key={index}>
                        {Object.values(item).map((value, index) => (
                            <Td key={index}>{value}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default DailyNewsletter;
