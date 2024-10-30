import express from 'express';
import DepartamentoService from "../services/departamentoService.js";

const router = express.Router();
const service = new DepartamentoService(); // Instancia del servicio

// Obtener todos los departamentos
router.get("/", (req, res) => {
    const departamentos = service.getAll();
    res.json(departamentos);
});

// Obtener un departamento específico por ID
router.get("/:numeroDepartamento", (req, res) => {
    const numeroDepartamento = Number(req.params.numeroDepartamento);
    const result = service.getById(numeroDepartamento);

    if (!result.success) {
        return res.status(404).json({ message: result.message });
    }

    res.json(result.departamento);
});

// Crear un nuevo departamento
router.post("/", (req, res) => {
    const result = service.create(req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    res.status(201).json({
        message: result.message,
        departamento: result.departamento,
    });
});

// Actualizar un departamento
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const result = service.update(id, req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    res.status(202).json({
        message: result.message,
        departamento: result.departamento,
    });
});

// Eliminar un departamento
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const result = service.delete(id);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    res.status(202).json({
        message: result.message,
        id,
    });
});

export default router;
