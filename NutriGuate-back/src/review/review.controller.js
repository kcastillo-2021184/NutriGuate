import Comment from "./review.model.js";

// Crear un nuevo comentario
export const createComment = async (req, res) => {
  try {
    const { author, content } = req.body;

    const newComment = new Comment({ author, content });  
    await newComment.save();

    return res.status(201).json({
      success: true,
      message: "Comentario guardado exitosamente",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al guardar el comentario",
      error: error.message,
    });
  }
};

// Obtener todos los comentarios
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los comentarios",
      error: error.message,
    });
  }
};
