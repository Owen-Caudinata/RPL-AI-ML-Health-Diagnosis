import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const Feedback = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);
    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/feedback/get-all', {
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

    const handleFeedbackSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/feedback/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({ feedback: feedbackText })
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            // Clear feedback text after successful submission
            setFeedbackText('');
            
            // Refetch data to update the table
            fetchData();

        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <>
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
            <Input
                placeholder="Enter your feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                marginBottom="1rem"
            />
            <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </>
    );
};

export default Feedback;
