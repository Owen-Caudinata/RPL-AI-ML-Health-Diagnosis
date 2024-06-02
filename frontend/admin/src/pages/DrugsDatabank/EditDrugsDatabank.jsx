import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input, Box, FormControl, FormLabel, Checkbox, Button, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EditDrugs = () => {
    const auth = useAuth();
    const { id } = useParams();
    const toast = useToast();
    const [formData, setFormData] = useState({ name: '', manufacturer: '', category: '', description: '', published: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + `/drug/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    const errorMessage = await response.text();
                    console.error('Error fetching data:', errorMessage);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, auth.token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(mainApiUrl + `/drug/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: 'Data updated successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                const errorMessage = await response.text();
                console.error('Error updating data:', errorMessage);
                toast({
                    title: 'Error',
                    description: `Error updating data: ${errorMessage}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: 'Error',
                description: `Error submitting form: ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSave}>
            <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="manufacturer">Manufacturer</FormLabel>
                <Input
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    value={formData.manufacturer}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="published">Published</FormLabel>
                <Checkbox
                    id="published"
                    name="published"
                    isChecked={formData.published}
                    onChange={(e) => {
                        handleChange({
                            target: { name: 'published', value: e.target.checked, type: 'checkbox' },
                        });
                    }}
                >
                    Is Published
                </Checkbox>
            </FormControl>
            <Button type="submit">Save Data</Button>
        </Box>
    );
};

export default EditDrugs;
