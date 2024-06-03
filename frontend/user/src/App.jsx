import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';

import EHR from './pages/EHR/EHR';
import AddEHR from './pages/EHR/AddEHR';
import EditEHR from './pages/EHR/EditEHR';

import Reminder from './pages/Reminder/Reminder'
import AddReminder from './pages/Reminder/AddReminder'
import EditReminder from './pages/Reminder/EditReminder'

import Feedback from './pages/Feedback';
import Alzheimer from './pages/Alzheimer';
import Pneumonia from './pages/Pneumonia';

import Fetal from './pages/Fetal';
import Chatbot from './pages/Chatbot';
import DrugsDatabank from './pages/DrugsDatabank';

import Appointment from './pages/Appointment/Appointment'
import AddAppointment from './pages/Appointment/AddAppointment'
import EditAppointment from './pages/Appointment/EditAppointment'

import Blog from './pages/Blog';

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
                

                <Route path="/reminder" element={<Reminder />} />
                <Route path="/reminder-add" element={<AddReminder />} />
                <Route path="/reminder/edit/:id" element={<EditReminder />} />

                <Route path="/chatbot" element={<Chatbot />} />

                <Route path="/drugsdatabank" element={<DrugsDatabank />} />

                <Route path="/appointment" element={<Appointment />} />
                <Route path="/appointment-add" element={<AddAppointment />} />
                <Route path="/appointment/edit/:id" element={<EditAppointment />} />

                <Route path="/blog" element={<Blog />} />

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
