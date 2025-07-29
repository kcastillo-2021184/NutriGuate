import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Principal.css';
import Navbar from '../../Components/Navbar2';
import Footer from '../../Components/Footer';
import img1 from '../../assets/sec1.jpg';
import tar1 from '../../assets/tar1.jpg';
import tar2 from '../../assets/tar2.jpg';
import tar3 from '../../assets/tar3.jpg';
import informate from '../../assets/Informate.png';
import cuernitos from '../../assets/cuernitos.png';
import vinito from '../../assets/vinito.png';

function MainPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3616/v1/review/')
      .then((res) => {
        const ultimos = res.data.comments.slice(0, 3);
        setReviews(ultimos);
      })
      .catch(() => {
        console.error('No se pudieron cargar las reviews');
      });
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="content">
        <header className="main-header">
          <h1>NutriGuate: Alimentación sana y accesible</h1>
          <p>
            Transforma tu salud y la de tu familia con recetas nutritivas, consejos prácticos y acceso a recursos locales.
            Porque todos merecen una vida digna, saludable y llena de oportunidades.
          </p>
          <img src={img1} alt="Frutas y vegetales" className="main-image" />
        </header>

        <section className="section">
          <h2>Soluciones a tu alcance</h2>
          <div className="cards-container">
            <div className="card">
              <img src={tar1} alt="Recetario interactivo" />
              <h3>Recetario interactivo</h3>
              <p>Encuentra recetas saludables según tu edad, economía y alimentos disponibles.</p>
            </div>
            <div className="card">
              <img src={tar2} alt="Guía nutricional" />
              <h3>Guía nutricional</h3>
              <p>Aprende cómo mejorar tu alimentación con tips sencillos y gráficos fáciles de entender.</p>
            </div>
            <div className="card">
              <img src={tar3} alt="Ferias y huertos locales" />
              <h3>Ferias y huertos locales</h3>
              <p>Localiza las ferias agrícolas y los huertos cercanos con productos frescos y accesibles.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="info-section">
            <ul>
              <h2>Infórmate y decide mejor</h2>
              <li>
                <strong>Preguntas frecuentes</strong><br />
                Resuelve tus dudas sobre alimentación con ayuda de profesionales.
              </li>
              <li>
                <strong>Contenido educativo</strong><br />
                Accede a artículos, videos y consejos prácticos sobre nutrición.
              </li>
              <li>
                <strong>Registro y control personal</strong><br />
                Lleva el seguimiento de tu peso y avances a través de tu perfil personalizado.
              </li>
            </ul>
            <img src={informate} alt="Frutas en la mesa" />
          </div>
        </section>

        <section className="section">
          <h2>Aliméntate con lo que tienes</h2>
          <div className="alimentacion-container">
            <div className="alimentacion-card">
              <img src={cuernitos} alt="Planes accesibles" />
              <h3>Planes accesibles</h3>
              <p>Diseñados para ajustarse a tus posibilidades económicas y recursos locales.</p>
            </div>
            <div className="alimentacion-card">
              <img src={vinito} alt="Alimentación práctica" />
              <h3>Alimentación práctica</h3>
              <p>Sugerencias reales para cocinar con lo que hay en tu casa, sin complicaciones.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Comentarios</h2>
          <div className="comentarios-grid">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="comentario-tarjeta">
                  <p className="comentario-texto">“{review.content}”</p>
                  <div className="comentario-autor">
                    <strong>{review.author}</strong>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </div>
          <div className="comentarios-boton">
            <button onClick={() => navigate('/review')}>Coméntanos</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
