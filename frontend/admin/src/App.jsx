import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';

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
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
