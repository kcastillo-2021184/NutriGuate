  import Diet from './diet.model.js'; 

  // Función para crear y guardar un nuevo plan de dieta
  export const createDietPlan = async (req, res) => {
    try {
      const {
        edad,
        genero,
        peso,
        altura,
        actividadFisica,
        condicionMedica,
        presupuestoMensual,
        preferenciasAlimentarias
      } = req.body;

      // Crear un nuevo plan de dieta usando los datos proporcionados
      const newDiet = new Diet({
        userId: req.user.uid,  
        edad,
        genero,
        peso,
        altura, 
        actividadFisica,
        condicionMedica,
        presupuestoMensual,
        preferenciasAlimentarias
      });

      await newDiet.save();

      // Devolver la respuesta al frontend con los datos de la dieta guardada
      return res.status(200).json({
        message: 'Plan de dieta guardado exitosamente.',
        diet: newDiet
      });
    } catch (error) {
      console.error('Error al crear el plan de dieta: ', error);
      return res.status(500).json({
        message: 'Error al guardar el plan de dieta',
        error: error.message
      });
    }
  };
