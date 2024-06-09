import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Input, Button, useToast } from '@chakra-ui/react'; // Or other form components
import { useAuth } from '../../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EditEHR = () => {
    const auth = useAuth();
    const { id } = useParams(); // Get the ID parameter from the URL
    const navigate = useNavigate();
    const toast = useToast();
    const [data, setData] = useState({ title: '', content: '' });

    const handleSave = async () => {
        try {
            const response = await fetch(mainApiUrl + `/ehr/edit/${id}`, { //TODO: CHANGE API URL
                method: 'PUT', // Or appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Record updated');
                toast({
                    title: 'Record updated.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate(-1); // Redirect to previous page
            } else {
                console.error('Error updating record');
                toast({
                    title: 'Error updating record.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error updating record:', error);
            toast({
                title: 'Error updating record.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box mt={32}>
            <h1>Edit Record {id}</h1>

            <Input
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Title"
            />
            <Input
                value={data.content}
                onChange={(e) => setData({ ...data, content: e.target.value })}
                placeholder="Content"
            />
            <Button onClick={handleSave}>Save</Button>
        </Box>
    );
};

export default EditEHR;
