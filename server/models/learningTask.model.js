import mongoose from "mongoose";

const learningTaskSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  },
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  maxScore: { type: Number, default: 100 },
  attachments: [String]
}, { timestamps: true });

export const LearningTask = mongoose.model("LearningTask", learningTaskSchema);
