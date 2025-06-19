import React from 'react';
import '../Pages/Main/Principal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>NutriGuate</h2>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <p>+502 5461-8966</p>
            <p>+502 5516-8752</p>
            <p>alejandromax@kinal.edu.gt</p>
          </div>

          <div className="footer-section">
            <h4>Nosotros</h4>
            <p><a href="#">¿Quiénes somos?</a></p>
          </div>

          <div className="footer-section">
            <h4>Mi cuenta</h4>
            <p><a href="#">Iniciar sesión</a></p>
            <p><a href="#">Registrarse</a></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
