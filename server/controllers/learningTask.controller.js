import { LearningTask } from "../models/learningTask.model.js";

export const createLearningTask = async (req, res) => {
  try {
    const task = await LearningTask.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasksByCourse = async (req, res) => {
  try {
    const tasks = await LearningTask.find({ courseId: req.params.courseId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
