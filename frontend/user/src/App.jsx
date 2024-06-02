import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import EHR from './pages/EHR';
import AddEHR from './pages/AddEHR';
import EditEHR from './pages/EditEHR';
import Reminder from './pages/Reminder'
import AddReminder from './pages/AddReminder'
import EditReminder from './pages/EditReminder'
import Feedback from './pages/Feedback';
import Alzheimer from './pages/Alzheimer';
import Pneumonia from './pages/Pneumonia';
import Fetal from './pages/Fetal';
import AddFetal from './pages/AddFetal';
import EditFetal from './pages/EditFetal';
import Chatbot from './pages/Chatbot';


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />

                <Route path="/alzheimer" element={<Alzheimer />} />
                <Route path="/pneumonia" element={<Pneumonia />} />


                <Route path="/ehr" element={<EHR />} />
                <Route path="/ehr-add" element={<AddEHR />} />
                <Route path="/ehr/edit/:id" element={<EditEHR />} />

                <Route path="/fetal" element={<Fetal />} />
                <Route path="/fetal/create" element={<AddFetal />} />
                <Route path="/fetal/edit/:id" element={<EditFetal />} />

                <Route path="/reminder" element={<Reminder />} />
                <Route path="/reminder-add" element={<AddReminder />} />
                <Route path="/reminder/edit/:id" element={<EditReminder />} />

<<<<<<< HEAD
                <Route path="/drugs" element={<Drugs />} />
                <Route path="/drugs-add" element={<AddDrugs />} />
                <Route path="/drugs/edit/:id" element={<EditDrugs />} />
=======
                <Route path="/chatbot" element={<Chatbot />} />
>>>>>>> 2b6dea9f0e1d2706b2a41b3f631c5a52c55d8def

                <Route path="/feedback" element={<Feedback />} />

              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
