import express from "express";
import {
  createQuiz,
  getQuizzesByCourse
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/course/:courseId", getQuizzesByCourse);

export default router;
