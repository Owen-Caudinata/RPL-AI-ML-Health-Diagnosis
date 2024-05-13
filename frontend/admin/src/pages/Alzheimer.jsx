import React, {  } from 'react';

import AlzheimerPredictionForm from '../components/AlzheimerPredictionForm'

const Alzheimer = () => {


    return (
        <AlzheimerPredictionForm inferenceAPI={"http://localhost:8000/alzheimer/predict"} reportAPI={"http://localhost:3000/alzheimer-report/create"} />
    );
};

export default Alzheimer;
