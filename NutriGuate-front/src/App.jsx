import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './Pages/Main/MainPage.jsx'
import Main2 from './Pages/Main/Main2.jsx'
import VistaLogin from './Pages/Login/Login.jsx';
import VistaRegister from './Pages/Register/Register.jsx';
import VistaMap from './Pages/Map/Map.jsx';
import VistaReview from './Pages/Review/Review.jsx';
import VistaPlan from './Pages/Plan/CrearPlan.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<Main2 />} />
      <Route path="/login" element={<VistaLogin />} />  
      <Route path="/register" element={<VistaRegister />} />  
      <Route path="/review" element={<VistaReview />} />
      <Route path="/plan" element={<VistaPlan />} />
      <Route path="/map" element={<VistaMap />} />  
      <Route path="*" element={<Navigate to="/" />} />  
    </Routes>
  )
}

export default App
