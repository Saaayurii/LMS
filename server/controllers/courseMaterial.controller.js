import { CourseMaterial } from "../models/courseMaterial.model.js";

export const addMaterial = async (req, res) => {
  try {
    const material = await CourseMaterial.create(req.body);
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMaterialsByCourse = async (req, res) => {
  try {
    const materials = await CourseMaterial.find({ courseId: req.params.courseId });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
