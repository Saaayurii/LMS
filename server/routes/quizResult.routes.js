import express from "express";
import {
  submitQuiz,
  getResultsByQuiz
} from "../controllers/quizResult.controller.js";

const router = express.Router();

router.post("/", submitQuiz);
router.get("/quiz/:quizId", getResultsByQuiz);

export default router;
