import React, { } from 'react';

import AlzheimerPredictionForm from '../components/AlzheimerPredictionForm';

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;
const mlApiUrl = import.meta.env.VITE_ML_API_URL;

const Alzheimer = () => {


    return (
        <AlzheimerPredictionForm
            inferenceAPI={mlApiUrl + "/alzheimer/predict"}
            reportAPI={mainApiUrl + "/alzheimer-report/create"} />
    );
}; //TODO: CHANGE API URL

export default Alzheimer;
