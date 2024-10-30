import express from "express";
import EncargadoService from "../services/encargadoService.js"; // Ajusta la ruta según la ubicación

const router = express.Router();
const service = new EncargadoService(); // Instancia del servicio

// Obtener todos los encargados
router.get("/", (req, res) => {
    const encargados = service.getAll();
    res.json(encargados);
});

// Obtener un encargado específico por ID
router.get("/:idEncargado", (req, res) => {
    const idEncargado = Number(req.params.idEncargado); // Convertir a número
    const encargado = service.getById(idEncargado);

    if (!encargado) {
        return res.status(404).json({ message: "Attendant not found" });
    }

    res.json(encargado);
});

// Crear un nuevo encargado
router.post("/", (req, res) => {
    const index = service.create(req.body);
    res.status(201).json(index);
});

// Actualizar un encargado
router.patch("/:idEncargado", (req, res) => {
    const idEncargado = Number(req.params.idEncargado); // Convertir a número
    try {
        const index = service.update(idEncargado, req.body);
        res.status(202).json(index);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Eliminar un encargado
router.delete("/:idEncargado", (req, res) => {
    const idEncargado = Number(req.params.idEncargado); // Convertir a número
    try {
        const index = service.delete(idEncargado);
        res.status(202).json(index);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Exportar el router como predeterminado
export default router;
