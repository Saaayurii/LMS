import mongoose from "mongoose";

const courseMaterialSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['theory', 'tip', 'pdf', 'link', 'cheatsheet'],
    required: true
  },
  content: String,
  attachmentUrl: String
}, { timestamps: true });

export const CourseMaterial = mongoose.model("CourseMaterial", courseMaterialSchema);
