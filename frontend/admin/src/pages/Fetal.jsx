import React, {  } from 'react';

import FetalPredictionForm from '../components/FetalPredictionForm'

const Fetal = () => {
    const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;
    const mlApiUrl = import.meta.env.VITE_ML_API_URL;

    return (
        <FetalPredictionForm 
            inferenceAPI={mlApiUrl + "/fetal/predict"} 
            reportAPI={mainApiUrl + "/fetal-report/create"} /> // TODO: fix
    );
};

export default Fetal;
