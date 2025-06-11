import express from "express";
import {
  createLearningTask,
  getTasksByCourse
} from "../controllers/learningTask.controller.js";

const router = express.Router();

router.post("/", createLearningTask);
router.get("/course/:courseId", getTasksByCourse);

export default router;
