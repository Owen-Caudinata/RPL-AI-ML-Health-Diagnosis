import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react'; // Or other form components
import { useAuth } from '../../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EditDailyNewsletter = () => {
    const auth = useAuth();
    const { id } = useParams(); // Get the ID parameter from the URL
    const [data, setData] = useState({ title: '', content: '' });
    const toast = useToast();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const response = await fetch(mainApiUrl + `/daily-newsletter/edit/${id}`, {
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
                    duration: 5000,
                    isClosable: true,
                });
                navigate(-1); // Navigate back
            } else {
                console.error('Error updating record');
                toast({
                    title: 'Error updating record.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error updating record:', error);
            toast({
                title: 'Error updating record.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default EditDailyNewsletter;
