import Diet from './diet.model.js';
import { generatePDF } from '../../src/DeepSeek.js'; // Archivo que haremos para usar DeepSeek

export const createDietPlan = async (req, res) => {
  try {
    const { edad, genero, peso, altura, actividadFisica, condicionMedica, presupuestoMensual, preferenciasAlimentarias } = req.body;
    const userId = req.user.uid;

    const nuevaDieta = new Diet({
      userId,
      edad,
      genero,
      peso,
      altura,
      actividadFisica,
      condicionMedica,
      presupuestoMensual,
      preferenciasAlimentarias
    });

    await nuevaDieta.save();

    const pdfBuffer = await generatePDF({
      edad,
      genero,
      peso,
      altura,
      actividadFisica,
      condicionMedica,
      presupuestoMensual,
      preferenciasAlimentarias
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="PlanNutricional.pdf"'
    });

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error al crear plan de dieta:', error);
    return res.status(500).json({
      success: false,
      message: 'No se pudo crear el plan de dieta',
      error: error.message
    });
  }
};
