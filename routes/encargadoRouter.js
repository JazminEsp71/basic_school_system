import express from "express";
import encargadoService from "../services/encargadoService.js"; // Ajusta la ruta según la ubicación

const router = express.Router();
const service = new encargadoService(); // Instancia del servicio

// Obtener todos los encargados
router.get("/", (req, res) => {
    const encargados = service.getAll();
    res.json(encargados);
});

// Obtener un encargado específico por ID
router.get("/:idEncargado", (req, res) => {
    const { idEncargado } = req.params;
    const encargado = service.getById(idEncargado);

    if (!encargado) {
        return res.status(404).json({ message: "Encargado no encontrado" });
    }

    res.json(encargado);
});

// Crear un nuevo encargado
router.post("/", (req, res) => {
    const result = service.create(req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    res.status(201).json({
        message: result.message,
        encargado: result.encargado,
    });
});

// Actualizar un encargado
router.patch("/:idEncargado", (req, res) => {
    const { idEncargado } = req.params;
    const result = service.update(idEncargado, req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    res.status(202).json({
        message: result.message,
        encargado: result.encargado,
    });
});

// Eliminar un encargado
router.delete("/:idEncargado", (req, res) => {
    const { idEncargado } = req.params;
    const respuesta = service.delete(idEncargado);

    if (!respuesta.success) {
        return res.status(400).json({ message: respuesta.message });
    }

    res.status(202).json({
        message: respuesta.message,
        idEncargado,
    });
});

// Exportar el router como predeterminado
export default router;
