import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Image, Heading, Text, Grid, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const PredictionForm = ({ inferenceAPI, reportAPI }) => {
    const auth = useAuth();

    const [userId, setUserId] = useState(null);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [description, setDescription] = useState(null);

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
            const response = await fetch(inferenceAPI, {
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

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePublish = async () => {
        try {
            const response = await fetch(reportAPI, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ predictionId: prediction.id, description, userId: parseInt(userId) })
            });

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error publishing:', error);
        }
    };

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg">
            <Grid templateColumns="1fr" gap={6}>
                <FormControl>
                    <Input
                        type="file"
                        id="file"
                        display="none"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <Button
                        as="label"
                        htmlFor="file"
                        cursor="pointer"
                        _hover={{ color: 'teal.500' }}
                        variant="outline"
                        mb={4}
                    >
                        Select an image
                    </Button>
                </FormControl>
                <Input
                    type="number"
                    onChange={handleUserIdChange}
                    placeholder="Enter User ID"
                    mb={4}
                />
                <Button colorScheme="teal" size="lg" onClick={handlePredict} disabled={!file}>
                    Predict
                </Button>
                {imageURL && (
                    <Box mt={6}>
                        <Image src={imageURL} alt="Selected image" maxW="400px" />
                    </Box>
                )}
                {prediction && (
                    <Box mt={6}>
                        <Heading as="h2" size="lg" mb={4}>
                            Prediction Results
                        </Heading>
                        <VStack align="stretch">
                            <PredictionItem label="ID" value={prediction.id} />
                            <PredictionItem label="Timestamp" value={new Date(prediction.timestamp).toLocaleString()} />
                            <PredictionItem label="Admin ID" value={prediction.admin_id} />
                            <PredictionItem label="Normal" value={(prediction.normal * 100).toFixed(2) + '%'} />
                            <PredictionItem label="Pneumonia" value={(prediction.pneumonia * 100).toFixed(2) + '%'} />

                        </VStack>
                    </Box>
                )}
                <Input
                    type="text"
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    mb={4}
                />
                <Button colorScheme="teal" size="lg" onClick={handlePublish} disabled={!file}>
                    Publish
                </Button>
            </Grid>
        </Box>
    );
};

const PredictionItem = ({ label, value }) => (
    <Box p={2} borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold">{label}</Text>
        <Text>{value}</Text>
    </Box>
);

export default PredictionForm;
