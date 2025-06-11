import { QuizResult } from "../models/quizResult.model.js";

export const submitQuiz = async (req, res) => {
  try {
    const result = await QuizResult.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResultsByQuiz = async (req, res) => {
  try {
    const results = await QuizResult.find({ quizId: req.params.quizId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
