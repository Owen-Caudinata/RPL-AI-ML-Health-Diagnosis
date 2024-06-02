import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Heading, Text, Grid, VStack, FormLabel} from '@chakra-ui/react';
import { useAuth } from '../hooks/AuthProvider';

const PredictionForm = ({ inferenceAPI, reportAPI }) => {
    const auth = useAuth();

    const [userId, setUserId] = useState(null);
    const [inputData, setInputData] = useState({
        mean_stv: '',
        percent_altv: '',
        astv: '',
        mean_hist: '',
        prolongued_decelerations: '',
    });
    const [prediction, setPrediction] = useState(null);
    const [description, setDescription] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePredict = async () => {
        try {
            const response = await fetch(inferenceAPI, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            const data = await response.json();
            setPrediction(data);
        } catch (error) {
            console.error('Error predicting:', error);
        }
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
                <FormControl mb={4}>
                    <FormLabel htmlFor="mean_stv">Mean STV</FormLabel>
                    <Input
                        type="number"
                        name="mean_stv"
                        value={inputData.mean_stv}
                        onChange={handleChange}
                        placeholder="Mean STV"
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="percent_altv">Percent ALTV</FormLabel>
                    <Input
                        type="number"
                        name="percent_altv"
                        value={inputData.percent_altv}
                        onChange={handleChange}
                        placeholder="Percent ALTV"
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="astv">ASTV</FormLabel>
                    <Input
                        type="number"
                        name="astv"
                        value={inputData.astv}
                        onChange={handleChange}
                        placeholder="ASTV"
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="mean_hist">Mean HIST</FormLabel>
                    <Input
                        type="number"
                        name="mean_hist"
                        value={inputData.mean_hist}
                        onChange={handleChange}
                        placeholder="Mean HIST"
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="prolongued_decelerations">Prolongued Decelerations</FormLabel>
                    <Input
                        type="number"
                        name="prolongued_decelerations"
                        value={inputData.prolongued_decelerations}
                        onChange={handleChange}
                        placeholder="Prolongued Decelerations"
                    />
                </FormControl>
                <Button colorScheme="teal" size="lg" onClick={handlePredict} disabled={!inputData.mean_stv || !inputData.percent_altv || !inputData.astv || !inputData.mean_hist || !inputData.prolongued_decelerations}>
                    Predict
                </Button>
                {prediction && (
                    <Box mt={6}>
                        <Heading as="h2" size="lg" mb={4}>
                            Prediction Results
                        </Heading>
                        <VStack align="stretch">
                            <PredictionItem label="Normal" value={(prediction.normal * 100).toFixed(2) + '%'} />
                            <PredictionItem label="Suspect" value={(prediction.suspect * 100).toFixed(2) + '%'} />
                            <PredictionItem label="Pathological" value={(prediction.pathological * 100).toFixed(2) + '%'} />
                        </VStack>
                    </Box>
                )}
                <Input
                    type="text"
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    mb={4}
                />
                <Button colorScheme="teal" size="lg" onClick={handlePublish} disabled={!prediction}>
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
