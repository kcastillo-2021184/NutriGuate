import Review from "./review.model.js";

// Crear un comentario
export const createComment = async (req, res) => {
  try {
    const { author, content } = req.body;

    const newReview = new Review({
      author,
      content,
    });

    await newReview.save();

    return res.status(201).send({
      success: true,
      message: "Review created successfully",
      Review: newReview,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Error creating comment",
      err: err.message,
    });
  }
};
