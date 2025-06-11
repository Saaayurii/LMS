import express from "express";
import {
  submitTask,
  getSubmissionsByTask
} from "../controllers/taskSubmission.controller.js";

const router = express.Router();

router.post("/", submitTask);
router.get("/task/:taskId", getSubmissionsByTask);

export default router;
