import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import './Login.css';
import loginImage from '../../assets/user.png';

const schema = yup.object().shape({
  userLoggin: yup.string().required('Usuario o correo obligatorio').trim(),
  password: yup
    .string()
    .required('Contraseña obligatoria')
    .min(8, 'Mínimo 8 caracteres'),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
  try {
    const response = await axios.post('http://localhost:3616/api/auth/login', {
      userLoggin: data.userLoggin,
      password: data.password
    });

    if (response.status !== 200) {
      throw new Error(response.data?.message || 'Credenciales incorrectas');
    }

    const { token, loggedUser: user, message } = response.data;

    toast.success(message || 'Sesión iniciada');
    setLoginSuccess(message || 'Inicio de sesión exitoso');
    setLoginError('');

    // Guardar token y usuario si querés mantener la sesión
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir al inicio
    setTimeout(() => {
      navigate('/main');
    }, 1000);

  } catch (error) {
    const backendMessage =
      error.response?.data?.message || error.message || 'Error al iniciar sesión';
    setLoginError(backendMessage);
    setLoginSuccess('');
    toast.error(backendMessage);
  }
};


  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="login-container">
        <div className="login-left">
          <h2>Inicia Sesión</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <input
              type="text"
              placeholder="Usuario o correo"
              {...register('userLoggin')}
            />
            {errors.userLoggin && <p>{errors.userLoggin.message}</p>}

            <input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
            />
            {errors.password && <p>{errors.password.message}</p>}

            {loginError && <p className="error-message">{loginError}</p>}
            {loginSuccess && <p className="success-message">{loginSuccess}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verificando...' : 'Entrar'}
            </button>

            <p>
              ¿No tienes una cuenta? <Link to="/register">Crea una</Link>
            </p>
          </form>
        </div>

        <div className="login-right">
          <img src={loginImage} alt="login icon" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
