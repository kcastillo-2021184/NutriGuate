import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/Main/Principal.css';
import logo from '../assets/LogoNutriGuate.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="NutriGuate Logo" />
      </div>
      <nav className="navbar__nav">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/map') }}>Ver Mapa</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Crear Plan</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Inicio</a>
        <button
          className="navbar__login-btn"
          onClick={() => navigate('/login')}
        >
          Acceder
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
