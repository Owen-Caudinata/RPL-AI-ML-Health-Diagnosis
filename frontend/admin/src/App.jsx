import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import WithAction from './components/Navbar';
import EHR from './pages/EHR';

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route element={<PrivateRoute />}>
                  <Route index element={<Home />} />
                  <Route path='/alzheimer' element={<EHR />} />
                  <Route path='/pneumonia' element={<EHR />} />
                  <Route path='/ehr' element={<EHR />} />
                  <Route path='/daily-newsletter' element={<EHR />} />
                  <Route path='/feedbacks' element={<EHR />} />
                  <Route path='/ehr' element={<EHR />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
