import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import registerImage from '../../assets/userR.png';
import './Register.css';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  surname: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  username: yup
    .string()
    .required('El usuario es obligatorio')
    .transform((val) => val.toLowerCase()),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe tener una mayúscula')
    .matches(/[a-z]/, 'Debe tener una minúscula')
    .matches(/[0-9]/, 'Debe tener un número')
    .matches(/[\W_]/, 'Debe tener un símbolo'),
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+()\s-]{7,20}$/, 'Teléfono inválido'),
});

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3616/api/auth/register', data);

      if (response.data.success) {
        setRegisterError('');
        setRegisterSuccess('Registro exitoso');
        toast.success('Registro exitoso');

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setRegisterSuccess('');
        setRegisterError(response.data.message || 'Error al registrar');
        toast.error('Error al registrar');
      }
    } catch (error) {
      setRegisterSuccess('');
      setRegisterError(error.response?.data?.message || 'Error de conexión o datos inválidos');
      toast.error('No se pudo completar el registro');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="register-container">
        <div className="register-left">
          <div className="register-content">
            <h2>Regístrate</h2>

            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" placeholder="Nombre" {...register('name')} />
              {errors.name && <p>{errors.name.message}</p>}

              <input type="text" placeholder="Apellido" {...register('surname')} />
              {errors.surname && <p>{errors.surname.message}</p>}

              <input type="email" placeholder="Correo electrónico" {...register('email')} />
              {errors.email && <p>{errors.email.message}</p>}

              <input type="text" placeholder="Nombre de usuario" {...register('username')} />
              {errors.username && <p>{errors.username.message}</p>}

              <input type="password" placeholder="Contraseña" {...register('password')} />
              {errors.password && <p>{errors.password.message}</p>}

              <input type="text" placeholder="Teléfono" {...register('phone')} />
              {errors.phone && <p>{errors.phone.message}</p>}

              {registerSuccess && <p className="success-message">{registerSuccess}</p>}
              {registerError && <p className="error-message">{registerError}</p>}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Submit'}
              </button>

              <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="register-right">
          <img src={registerImage} alt="register icon" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
