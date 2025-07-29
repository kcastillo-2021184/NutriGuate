export const useDeepseek = () => {
  const generarPlan = async (prompt) => {
    try {
      const res = await fetch('http://localhost:3001/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });


      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');


      return data.respuesta;
    } catch (err) {
      console.error('Error llamando a DeepSeek:', err);
      throw new Error('No se pudo generar el plan con DeepSeek.');
    }
  };


  return { generarPlan };
};