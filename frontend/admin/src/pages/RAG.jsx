import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const chatbotApiUrl = import.meta.env.VITE_CHATBOT_API_URL;

const RAG = () => {
  const toast = useToast();
  const [createFormData, setCreateFormData] = useState({ url: '', chunk_size: '', chunk_overlap: '' });
  const [deleteFormData, setDeleteFormData] = useState({ title: '' });
  const [documents, setDocuments] = useState([]);
  const auth = useAuth();

  const handleChangeCreate = (e) => {
    const { name, value } = e.target;
    setCreateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeDelete = (e) => {
    const { name, value } = e.target;
    setDeleteFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', createFormData);

    try {
      const response = await fetch(`${chatbotApiUrl}/docs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(createFormData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Data added successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Clear the form data
        setCreateFormData({ url: '', chunk_size: '', chunk_overlap: '' });

      } else {
        console.error('Error adding data:', result);
        toast({
          title: 'Error',
          description: `Error adding data: ${result.detail || 'Unknown error'}`,
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

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', deleteFormData);

    try {
      const response = await fetch(`${chatbotApiUrl}/docs/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(deleteFormData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Data deleted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Clear the form data
        setDeleteFormData({ url: '' });

      } else {
        console.error('Error deleting data:', result);
        toast({
          title: 'Error',
          description: `Error deleting data: ${result.detail || 'Unknown error'}`,
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
    <Box>
      <Box as="form" onSubmit={handleSubmitCreate}>
        <FormControl>
          <FormLabel htmlFor="url">URL</FormLabel>
          <Input
            id="url"
            name="url"
            type="text"
            value={createFormData.url}
            onChange={handleChangeCreate}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="chunk_size">Chunk Size</FormLabel>
          <Input
            id="chunk_size"
            name="chunk_size"
            type="number"
            value={createFormData.chunk_size}
            onChange={handleChangeCreate}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="chunk_overlap">Chunk Overlap</FormLabel>
          <Input
            id="chunk_overlap"
            name="chunk_overlap"
            type="number"
            value={createFormData.chunk_overlap}
            onChange={handleChangeCreate}
          />
        </FormControl>

        <Button type="submit">Add Documents</Button>
      </Box>

      <Box as="form" onSubmit={handleSubmitDelete}>
        <FormControl>
          <FormLabel htmlFor="url_delete">Delete Docs By URL</FormLabel>
          <Input
            id="url_delete"
            name="url"
            type="text"
            value={deleteFormData.title}
            onChange={handleChangeDelete}
          />
        </FormControl>

        <Button type="submit">Delete Documents</Button>
      </Box>
    </Box>
  );
};

export default RAG;
