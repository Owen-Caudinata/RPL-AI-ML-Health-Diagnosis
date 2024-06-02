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
import DailyNewsletter from "./pages/DailyNewsletter/DailyNewsletter";
import AddDailyNewsletter from './pages/DailyNewsletter/AddDailyNewsletter';
import EditDailyNewsletter from "./pages/DailyNewsletter/EditDailyNewsletter";
import Chatbot from "./pages/Chatbot";
import DrugsDatabank from './pages/DrugsDatabank/DrugsDatabank';
import AddDrugsDatabank from './pages/DrugsDatabank/AddDrugsDatabank';
import EditDrugsDatabank from "./pages/DrugsDatabank/EditDrugsDatabank";
import HealthEducation from './pages/HealthEducation/HealthEducation';
import AddHealthEducation from './pages/HealthEducation/AddHealthEducation';
import EditHealthEducation from "./pages/HealthEducation/EditHealthEducation";

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

                <Route path='/drugsdatabank' element={<DrugsDatabank />} />
                <Route path='/drugsdatabank/add' element={<AddDrugsDatabank />} />
                <Route path='/drugsdatabank/edit/:id' element={<EditDrugsDatabank />} />

                <Route path='/blog' element={<HealthEducation />} />
                <Route path='/blog/add' element={<AddHealthEducation />} />
                <Route path='/blog/edit/:id' element={<EditHealthEducation />} />


              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
