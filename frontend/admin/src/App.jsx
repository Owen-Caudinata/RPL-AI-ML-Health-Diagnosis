import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import EHR from './pages/EHR';
import Alzheimer from './pages/Alzheimer';
import Pneumonia from "./pages/Pneumonia";
import Fetal from "./pages/Fetal";
import Feedback from "./pages/Feedback";
import DailyNewsletter from "./pages/DailyNewsletter";
import AddDailyNewsletter from './pages/AddDailyNewsletter';
import EditDailyNewsletter from "./pages/EditDailyNewsletter";
<<<<<<< HEAD
import Drugs from "./pages/Drugs";
import AddDrugs from "./pages/AddDrugs";
import EditDrugs from "./pages/EditDrugs";


=======
import Chatbot from "./pages/Chatbot"
>>>>>>> 2b6dea9f0e1d2706b2a41b3f631c5a52c55d8def

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
                <Route path='/fetal' element={<Fetal />} />

                <Route path='/ehr' element={<EHR />} />

                <Route path='/chatbot' element={<Chatbot />} />

                <Route path='/daily-newsletter' element={<DailyNewsletter />} />
                <Route path='/daily-newsletter/add' element={<AddDailyNewsletter />} />
                <Route path='/daily-newsletter/edit/:id' element={<EditDailyNewsletter />} />


                <Route path='/feedback' element={<Feedback />} />

<<<<<<< HEAD
                  <Route path='/drugs' element={<Drugs />} />
                  <Route path='/drugs/add' element={<AddDrugs />} />
                  <Route path='/drugs/edit/:id' element={<EditDrugs />} />

                  <Route path='/feedback' element={<Feedback />} />
                  
=======
>>>>>>> 2b6dea9f0e1d2706b2a41b3f631c5a52c55d8def
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
