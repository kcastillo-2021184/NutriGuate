import { Router } from "express";
import { createComment, getComments } from "./review.controller.js";
import { commentValidator } from "../../helpers/validators.js";

const api = Router();

// Rutas públicass
api.post(
  "/create", 
  [commentValidator],
  createComment
);

api.get(
  "/", 
  getComments
);

export default api;
