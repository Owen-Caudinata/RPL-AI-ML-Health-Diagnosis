import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Box, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const Feedback = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);
    const [feedbackText, setFeedbackText] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackError, setFeedbackError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            setLoading(true);
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
            setFeedbackSubmitted(true);
            
            // Refetch data to update the table
            fetchData();

        } catch (error) {
            console.error('Error submitting feedback:', error);
            setFeedbackError('Failed to submit feedback. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFeedbackText(e.target.value);
        setFeedbackError('');
    };

    return (
        <Box>
            <Input
                placeholder="Enter your feedback"
                value={feedbackText}
                onChange={handleInputChange}
                marginBottom="1rem"
                isDisabled={loading || feedbackSubmitted}
            />
            {feedbackError && (
                <Text color="red.500" marginBottom="1rem">
                    {feedbackError}
                </Text>
            )}
            <Button onClick={handleFeedbackSubmit} isLoading={loading} isDisabled={!feedbackText || loading || feedbackSubmitted}>
                {feedbackSubmitted ? "Feedback Submitted" : "Submit Feedback"}
            </Button>

            {loading && <Text>Loading...</Text>}

            {data.length > 0 && (
                <Table variant="simple" marginTop="2rem">
                    <Thead>
                        <Tr>
                            {Object.keys(data[0]).map((key) => (
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
            )}
        </Box>
    );
};

export default Feedback;
