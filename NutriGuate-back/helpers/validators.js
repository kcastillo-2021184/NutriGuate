//Validar campos en las rutas
import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrorWithoutImg } from "./validate.error.js"
import { existUsername, existEmail, objectIdValid } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrorWithoutImg
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrorWithoutImg
]

//Validaciones para realizar update
export const updateUserValidator = [
    body('name', 'Name is required').optional().notEmpty(),
    body('surname', 'Surname is required').optional().notEmpty(),
    body('email', 'Email is not valid').optional().isEmail(),
    body('phone', 'Phone is not valid').optional().isMobilePhone(),
    validateErrorWithoutImg
]

export const updatePasswordValidator = [
    body('currentPassword', 'Current password is required').notEmpty(),
    body('newPassword', 'New password is required')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Please write a stronger password')
        .isLength({min: 8}),
        validateErrorWithoutImg
]

export const dietValidator = [
  body('edad', 'Edad es requerida y debe ser un número positivo')
    .notEmpty()
    .isInt({ min: 1, max: 120 }), // La edad debe ser un número entero positivo
  body('genero', 'Género es requerido')
    .notEmpty()
    .isIn(['masculino', 'femenino']), // Validar que el género esté en una lista de opciones
  body('peso', 'Peso es requerido y debe ser un número positivo')
    .notEmpty()
    .isFloat({ min: 1 }), // Validar que el peso sea un número mayor a 0
  body('altura', 'Altura es requerida y debe ser un número positivo')
    .notEmpty()
    .isFloat({ min: 1 }), // Validar que la altura sea un número mayor a 0
  body('actividadFisica', 'Actividad física es requerida')
    .notEmpty()
    .isIn(['Sedentario', 'Ligera', 'Moderada', 'Intensa', 'Alto Rendimiento']), // Validar actividad física
  body('presupuestoMensual', 'Presupuesto mensual es requerido y debe ser un número positivo')
    .notEmpty()
    .isFloat({ min: 1 }), // Validar que el presupuesto sea un número positivo
  validateErrorWithoutImg
]