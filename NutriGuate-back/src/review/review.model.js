import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    author: {
      type: String,
      required: [true, "Author name is required"],
      maxLength: [50, "Can't be overcome 50 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Modify the toJSON method to exclude certain fields
commentSchema.methods.toJSON = function () {
  const { __v, ...comment } = this.toObject();
  return comment;
};

export default model("Comment", commentSchema);
