import { Router } from 'express';
import { createDietPlan } from './diet.controller.js';
import { validateJwt, isUser } from '../../middlewares/validate.jwt.js'; 
import { dietValidator } from '../../helpers/validators.js'; 

const api = Router();

// Ruta para crear un nuevo plan de dieta
api.post(
  '/create', 
  [validateJwt, dietValidator], 
  createDietPlan
);

// Si necesitaras más rutas en el futuro, como la de obtener dietas o actualizar, las puedes agregar aquí

export default api;
