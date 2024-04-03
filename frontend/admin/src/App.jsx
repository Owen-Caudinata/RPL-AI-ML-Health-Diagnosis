import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import EHR from './pages/EHR';
import Alzheimer from './pages/Alzheimer';
import Pneumonia from "./pages/Pneumonia";
import Feedback from "./pages/Feedback";
import DailyNewsletter from "./pages/DailyNewsletter";

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
                  <Route path='/alzheimer' element={<Alzheimer />} />
                  <Route path='/pneumonia' element={<Pneumonia />} />
                  <Route path='/ehr' element={<EHR />} />
                  <Route path='/daily-newsletter' element={<DailyNewsletter />} />
                  <Route path='/feedback' element={<Feedback />} />
                  
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
