import React, {  } from 'react';
import PneumoniaPredictionForm from '../components/PneumoniaPredictionForm';

const Pneumonia = () => {
   

    return (
        <PneumoniaPredictionForm api={"http://localhost:8000/pneumonia/predict"} />
    );
};

export default Pneumonia;
