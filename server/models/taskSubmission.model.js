import mongoose from "mongoose";

const taskSubmissionSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningTask',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submissionText: String,
  submittedAt: { type: Date, default: Date.now },
  attachments: [String],
  grade: Number,
  feedback: String
}, { timestamps: true });

export const TaskSubmission = mongoose.model("TaskSubmission", taskSubmissionSchema);
