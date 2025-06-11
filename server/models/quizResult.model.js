import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  answers: [Number],
  score: Number
}, { timestamps: true });

export const QuizResult = mongoose.model("QuizResult", quizResultSchema);
