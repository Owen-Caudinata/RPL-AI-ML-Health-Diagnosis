import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input, Box, FormControl, FormLabel, Checkbox, Button, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EditBlog = () => {
    const auth = useAuth();
    const { id } = useParams();
    const toast = useToast();
    const [formData, setFormData] = useState({ title: '', content: '', author: '', category: '', published: false });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(mainApiUrl + `/blog/${id}`, {
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
            console.log(formData);
            const response = await fetch(mainApiUrl + `/blog/edit/${id}`, {
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

                navigate(-1);

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
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Input
                    id="content"
                    name="content"
                    type="text"
                    value={formData.content}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                    id="author"
                    name="author"
                    type="text"
                    value={formData.author}
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
                <FormLabel htmlFor="published">Published</FormLabel>
                <Checkbox
                    id="published"
                    name="published"
                    isChecked={formData.published}
                    onChange={(e) => handleChange(e)}
                >
                    Is Published
                </Checkbox>
            </FormControl>
            <Button type="submit">Save Data</Button>
        </Box>
    );
};

export default EditBlog;
