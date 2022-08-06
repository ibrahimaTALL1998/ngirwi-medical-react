import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//home
import Home from './component/home/Home';

//login
import Login from './component/Login/Login';

//patients components
import PatientList from './component/patient/PatientList';
import PatientForm from './component/patient/PatientForm';
import PatientDetails from './component/patient/PatientDetails';
import DossierMedical from './component/patient/DossierMedical';
import ConsultationForm from './component/patient/ConsultationForm';
import ConsultationList from './component/patient/ListConsultation';
import ConsultationDetails from './component/patient/ConsultationDetails';
import Ordonance from './component/patient/Ordonance';


function App() {
  return (
    <div>
      <Router>
        <div className='container'>
          <Routes path="/">
            <Route index element={<Login />} />
            <Route exact path="home" element={<Home />} />
            <Route exact path="patients" element={<PatientList />} />
            <Route exact path="patients/:add" element={<PatientList />} />
            <Route exact path="patients/:update" element={<PatientList />} />
            <Route exact path="add-patient" element={<PatientForm />} />
            <Route path="/edit-patient/:idPatient" element={<PatientForm />} />
            <Route path="/details-patient/:idPatient" element={<PatientDetails />} />
            <Route path="/dossier-patient/:idPatient" element={<DossierMedical />} />
            <Route path="/consultations-patient/:idPatient" element={<ConsultationList />} />
            <Route path="/consultation-patient-add/:idPatient" element={<ConsultationForm />} />
            <Route path="/consultation-patient-update/:idPatient/:idForm" element={<ConsultationForm />} />
            <Route path="/consultation-patient-details/:idPatient/:idForm" element={<ConsultationDetails />} />
            <Route path="/consultation-patient-details-ordonance/:idPatient/:idForm" element={<Ordonance />} />
            {/* redirect when route doesn't exist */}
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;
