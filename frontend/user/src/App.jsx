import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import EHR from './pages/EHR';
import AddEHR from './pages/AddEHR';
import EditEHR from './pages/EditEHR';

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
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
