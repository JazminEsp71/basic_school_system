import { Router } from "express";
import AreaService from "../services/AreaService.js";

const router = Router();
const service = new AreaService();

// Obtener todas las áreas
router.get("/", (req, res) => {
  const areas = service.getAll();
  res.json(areas);
});

// Obtener un área por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const area = service.getById(parseInt(id));
  if (area) {
    res.json(area);
  } else {
    res.status(404).json({ message: "Area not found" });
  }
});

// Crear un nuevo área
router.post("/", (req, res) => {
  const body = req.body;
  const newArea = service.create(body);
  res.status(201).json(newArea);
});

// Actualizar un área existente
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedArea = service.update(parseInt(id), body);
    res.json(updatedArea);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar un área
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const response = service.delete(parseInt(id));
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
