import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Image, Heading, Text, Grid, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const PredictionForm = ({ api }) => {
    const auth = useAuth();

    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Display the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setImageURL(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handlePredict = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${auth.token}`
                },
                body: formData
            });

            const data = await response.json();
            setPrediction(data);
        } catch (error) {
            console.error('Error predicting:', error);
        }
    };

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg">
            <Grid display="flex" alignItems="center" templateColumns="repeat(2, 1fr)" gap={6}>
                <Box>
                    <FormControl>
                        <Input
                            type="file"
                            id="file"
                            display="none"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </FormControl>
                    <Button
                        as="label"
                        htmlFor="file"
                        cursor="pointer"
                        _hover={{ color: 'teal.500' }}
                        variant="outline"
                    >
                        Select an image
                    </Button>
                </Box>
                <Box>
                    <Button colorScheme="teal" size="lg" onClick={handlePredict} disabled={!file}>
                        Predict
                    </Button>
                </Box>

            </Grid>
            {imageURL && (
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <Box>
                        <Image src={imageURL} alt="Selected image" maxW="400px" />
                    </Box>
                    <Box>
                        {prediction && (
                            <Box>
                                <Heading as="h2" size="lg">
                                    Prediction Results
                                </Heading>
                                <VStack align="stretch" mt={2}>
                                    <Box p={2} borderWidth="1px" borderRadius="md">
                                        <Text fontWeight="bold">ID</Text>
                                        <Text>{(prediction.id)}</Text>
                                    </Box>
                                    <Box p={2} borderWidth="1px" borderRadius="md">
                                        <Text fontWeight="bold">Timestamp</Text>
                                        <Text>{new Date(prediction.timestamp).toLocaleString()}</Text>
                                    </Box>

                                    <Box p={2} borderWidth="1px" borderRadius="md">
                                        <Text fontWeight="bold">Admin ID</Text>
                                        <Text>{(prediction.admin_id)}</Text>
                                    </Box>

                                    <Box p={2} borderWidth="1px" borderRadius="md">
                                        <Text fontWeight="bold">Normal</Text>
                                        <Text>{(prediction.normal * 100).toFixed(2)}%</Text>
                                    </Box>
                                    <Box p={2} borderWidth="1px" borderRadius="md">
                                        <Text fontWeight="bold">Pneumonia</Text>
                                        <Text>{(prediction.pneumonia * 100).toFixed(2)}%</Text>
                                    </Box>

                                </VStack>
                            </Box>
                        )}
                    </Box>
                </Grid>
            )}
        </Box>
    );
};

export default PredictionForm;
