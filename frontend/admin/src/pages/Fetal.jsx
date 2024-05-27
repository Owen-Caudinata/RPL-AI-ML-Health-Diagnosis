import React, {  } from 'react';

import FetalPredictionForm from '../components/FetalPredictionForm'

const Fetal = () => {


    return (
        <FetalPredictionForm inferenceAPI={"http://localhost:8000/fetal/predict"} reportAPI={"http://localhost:3000/alzheimer-report/create"} />
    );
};

export default Fetal;
