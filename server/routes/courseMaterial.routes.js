import express from "express";
import {
  addMaterial,
  getMaterialsByCourse
} from "../controllers/courseMaterial.controller.js";

const router = express.Router();

router.post("/", addMaterial);
router.get("/course/:courseId", getMaterialsByCourse);

export default router;
