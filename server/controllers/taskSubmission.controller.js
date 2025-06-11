import { TaskSubmission } from "../models/taskSubmission.model.js";

export const submitTask = async (req, res) => {
  try {
    const submission = await TaskSubmission.create(req.body);
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubmissionsByTask = async (req, res) => {
  try {
    const submissions = await TaskSubmission.find({ taskId: req.params.taskId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
