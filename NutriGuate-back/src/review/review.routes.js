import { Router } from "express";
import { createComment } from "./review.controller.js";
import { commentValidator } from "../../helpers/validators.js";

const api = Router();

// Rutas públicass
api.post(
  "/create", 
  [commentValidator],
  createComment
);

export default api;
