import React, { useState } from 'react';
import * as yup from 'yup';
import './FormularioUsuario.css';
import Navbar from '../../Components/Navbar2';
import Footer from '../../Components/Footer';
import trote from '../../assets/crearPlan.jpg';
import toast from 'react-hot-toast';

function CrearPlan() {
  const [formData, setFormData] = useState({
    edad: '',
    genero: '',
    peso: '',
    altura: '',
    actividadFisica: '',
    condicionMedica: '',
    presupuestoMensual: '',
    preferenciasAlimentarias: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schema = yup.object().shape({
      edad: yup.number().required("La edad es obligatoria").min(1).max(120),
      genero: yup.string().required("El género es obligatorio").oneOf(["masculino", "femenino"]),
      peso: yup.number().required("El peso es obligatorio").moreThan(0, 'Debe ser mayor a 0'),
      altura: yup.number().required("La altura es obligatoria").moreThan(0, 'Debe ser mayor a 0'),
      actividadFisica: yup.string()
        .required("La actividad física es obligatoria")
        .oneOf(["Sedentario", "Ligera", "Moderada", "Intensa", "Alto Rendimiento"]),
      condicionMedica: yup.string().optional(),
      presupuestoMensual: yup.number().required("El presupuesto es obligatorio").moreThan(0),
      preferenciasAlimentarias: yup.string().optional()
    });

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:3616/v1/diet/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error al generar el plan');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'PlanNutricional.pdf';
      link.click();
      link.remove();

      toast.success("Plan generado con éxito 🎉");
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach(e => newErrors[e.path] = e.message);
        setErrors(newErrors);
      } else {
        toast.error(err.message || "Error inesperado");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="formulario-wrapper">
        <form className="formulario" onSubmit={handleSubmit}>
          <h2>Cuéntanos sobre ti</h2>

          <label>Edad</label>
          <input name="edad" type="number" value={formData.edad} onChange={handleChange} className={errors.edad ? "error" : ""} />
          {errors.edad && <p>{errors.edad}</p>}

          <label>Género</label>
          <input name="genero" type="text" value={formData.genero} onChange={handleChange} className={errors.genero ? "error" : ""} />
          {errors.genero && <p>{errors.genero}</p>}

          <label>Peso (kg)</label>
          <input name="peso" type="number" value={formData.peso} onChange={handleChange} className={errors.peso ? "error" : ""} />
          {errors.peso && <p>{errors.peso}</p>}

          <label>Altura (en metros)</label>
          <input name="altura" type="number" value={formData.altura} onChange={handleChange} className={errors.altura ? "error" : ""} />
          {errors.altura && <p>{errors.altura}</p>}

          <label>Actividad física</label>
          <select name="actividadFisica" value={formData.actividadFisica} onChange={handleChange} className={errors.actividadFisica ? "error" : ""}>
            <option value="">Selecciona una opción</option>
            <option value="Sedentario">Sedentario</option>
            <option value="Ligera">Ligera</option>
            <option value="Moderada">Moderada</option>
            <option value="Intensa">Intensa</option>
            <option value="Alto Rendimiento">Alto Rendimiento</option>
          </select>
          {errors.actividadFisica && <p>{errors.actividadFisica}</p>}

          <label>Condición médica relevante</label>
          <input name="condicionMedica" type="text" value={formData.condicionMedica} onChange={handleChange} className={errors.condicionMedica ? "error" : ""} />
          {errors.condicionMedica && <p>{errors.condicionMedica}</p>}

          <label>Presupuesto mensual</label>
          <input name="presupuestoMensual" type="number" value={formData.presupuestoMensual} onChange={handleChange} className={errors.presupuestoMensual ? "error" : ""} />
          {errors.presupuestoMensual && <p>{errors.presupuestoMensual}</p>}

          <label>Preferencias alimentarias</label>
          <input name="preferenciasAlimentarias" type="text" value={formData.preferenciasAlimentarias} onChange={handleChange} className={errors.preferenciasAlimentarias ? "error" : ""} />
          {errors.preferenciasAlimentarias && <p>{errors.preferenciasAlimentarias}</p>}

          <button type="submit">Enviar</button>
        </form>

        <div className="imagen-formulario">
          <img src={trote} alt="Trotando" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CrearPlan;
