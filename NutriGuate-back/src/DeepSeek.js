import axios from 'axios';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

export const generatePDF = async (datos) => {
  const prompt = `
Eres un nutricionista profesional. Genera un plan nutricional mensual basado en estos datos:

Edad: ${datos.edad}
Género: ${datos.genero}
Peso: ${datos.peso} kg
Altura: ${datos.altura} cm
Nivel de actividad física: ${datos.actividadFisica}
Condiciones médicas: ${datos.condicionMedica || 'Ninguna'}
Presupuesto mensual: Q${datos.presupuestoMensual}
Preferencias alimentarias: ${datos.preferenciasAlimentarias || 'Ninguna'}

Incluye una receta sugerida que se adapte a este perfil.
  `;

  const respuesta = await axios.post(
    'https://api.deepseek.com/v1/chat/completions',
    {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
      }
    }
  );

  const textoGenerado = respuesta.data.choices[0].message.content;

  const doc = new PDFDocument();
  const chunks = [];

  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  doc.fontSize(18).text('Plan Nutricional Mensual', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(textoGenerado);
  doc.end();

  return await new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });
};
