import React, { } from 'react';
import PneumoniaPredictionForm from '../components/PneumoniaPredictionForm';

const Pneumonia = () => {


    return (
        <PneumoniaPredictionForm inferenceAPI={"http://localhost:8000/pneumonia/predict"} reportAPI={"http://localhost:3000/pneumonia-report/create"} />
    ); //TODO: CHANGE API URL
};

export default Pneumonia;
