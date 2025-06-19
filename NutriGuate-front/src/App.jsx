import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './Pages/Main/MainPage.jsx'
import VistaLogin from './Pages/Login/Login.jsx';
import VistaRegister from './Pages/Register/Register.jsx';
import VistaMap from './Pages/Map/Map.jsx';
import VistaReview from './Pages/Review/Review.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<VistaLogin />} />  
      <Route path="/register" element={<VistaRegister />} />  
      <Route path="/review" element={<VistaReview />} />
      <Route path="/map" element={<VistaMap />} />  
      <Route path="*" element={<Navigate to="/" />} />  
    </Routes>
  )
}

export default App
