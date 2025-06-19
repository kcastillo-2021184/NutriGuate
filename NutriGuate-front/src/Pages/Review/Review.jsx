import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Review.css';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Review = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname || !message) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3616/v1/review/create', {
        author: nickname,
        content: message
      });

      if (response.data.success) {
        toast.success('Comentario enviado correctamente');
        setNickname('');
        setMessage('');
      } else {
        toast.error(response.data.message || 'Ocurrió un error');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al enviar el comentario');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="review-container">
        <br /><br />
        <h2>Agrega un comentario</h2>
        <form className="review-form" onSubmit={handleSubmit}>
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="¿Cómo deseas aparecer?"
          />

          <label htmlFor="message">Coméntanos</label>
          <textarea
            id="message"
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deja aquí tu mensaje"
          ></textarea>

          <button type="submit">Enviar</button>
          <br /><br /><br />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Review;
