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

                <Route path="/ehr" element={<EHR />} />
                <Route path="/ehr-add" element={<AddEHR />} />
                <Route path="/ehr/edit/:id" element={<EditEHR />} />

                <Route path="/reminder" element={<Reminder />} />
                <Route path="/reminder-add" element={<AddReminder />} />
                <Route path="/reminder/edit/:id" element={<EditReminder />} />

              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
