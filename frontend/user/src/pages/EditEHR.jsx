import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react'; // Or other form components
import { useAuth } from '../hooks/AuthProvider';

const EditEHR = () => {
    const auth = useAuth();
    const { id } = useParams(); // Get the ID parameter from the URL
    const [data, setData] = useState({ title: '', content: '' });

    const handleSave = async () => {
        const response = await fetch(`http://localhost:3000/ehr/edit/${id}`, { //TODO: CHANGE API URL
            method: 'PUT', // Or appropriate HTTP method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Record updated');
        } else {
            console.error('Error updating record');
        }
    };

    return (
        <div>
            <h1>Edit Record {id}</h1>

            <Input
                // value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Title"
            />
            <Input
                // value={data.content}
                onChange={(e) => setData({ ...data, content: e.target.value })}
                placeholder="Content"
            />
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default EditEHR;
