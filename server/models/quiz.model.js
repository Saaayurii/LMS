import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [String],
      correctAnswerIndex: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

export const Quiz = mongoose.model("Quiz", quizSchema);
