import express, { json } from 'express';
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

//Crear un nuevo departamento
router.post("/", (req, res) =>{
    //Llama metodo 'created', pasando los datos del cuerpo de la solicitud
    const result = service.created(req.body);

    if(!result.success){
        //Si las validaciones en service fallaron, devuelve un mensaje de error
        return res.status(400).json({message: result.message});
    }

    //Si todo salio bien, devuelve el departamento creado
    res.status(201).json({
        message: result.message,
        departamento: result.departamento
    });
});


//Actualizar un departamento
router.patch("/", (req, res) =>{
    //Llama metodo 'update', pasando los datos del cuerpo de la solicitud
    const result = service.update(req.body);

    if(!result.success){
        //Si las validaciones en service fallaron, devuelve un mensaje de error
        return res.status(400).json({message: result.message});
    }

    //Si todo salio bien, devuelve el departamento actualizado
    res.status(202).json({
        message: result.message,
        departamento: result.departamento
    });
});

//Eliminar un departamento
router.delete("/:id", (req, res) =>{
    //Llama metodo 'delete', pasando por id del departamento
    const {id} = req.params;
    const respuesta = service.delete(id);

    if(!respuesta.success){
        //Si las validaciones en servicio fallaron, devuelve un mensaje de error
        return res.status(400),json({message: respuesta.message});
    }
    res.status(202).json({
        message: respuesta.message,
        id
    })
});

//Exportar el router como predeterminado
export default router;
