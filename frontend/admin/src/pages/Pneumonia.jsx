import React, { } from 'react';
import PneumoniaPredictionForm from '../components/PneumoniaPredictionForm';

const Pneumonia = () => {
    const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;
    const mlApiUrl = import.meta.env.VITE_MAIN_API_URL;

    return (
        <PneumoniaPredictionForm
            inferenceAPI={mlApiUrl + "/pneumonia/predict"}
            reportAPI={mainApiUrl + "/pneumonia-report/create"} />
    ); //TODO: CHANGE API URL
};

export default Pneumonia;
