import express from 'express';
import departamentoService from "../services/departamentoService.js";

const router = express.Router();
const service = new departamentoService(); //Instancia del servicio

// Obtener todos los departamentos
router.get("/", (req, res) => {
    const departamentos = service.getAll();
    res.json(departamentos);
});

//Obtener un departamento específico por ID
router.get("/:numeroDepartamento", (req, res) =>{
    const {numeroDepartamento} = req.params;
    const body = req.body;
    const departamento = service.getById(numeroDepartamento, body);
    res.json(departamento);
});

//ruta para crear un nuevo departamento
router.post("/", (req, res) =>{
    const body = req.body;
    const newDepartamento = service.created(body);
    res.status(201).json(newDepartamento)
});

//Exportar el router como predeterminado
export default router;
