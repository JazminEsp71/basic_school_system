import express from 'express';
import empleadoService from '../services/empleadoService.js';

const router = express.Router();
const service = new empleadoService();  //Instancia del servicio
 
// Obtener todos los empleados
router.get("/", (req, res) => {
    const empleados = service.getAll();
    res.json(empleados);
  }); 

  //Obtener un empleado especifico por ID
  router.get("/:numeroEmpleado", (req, res) =>{
    const {numeroEmpleado} = req.params;
    const body = req.body;
    const empleado = service.getById(numeroEmpleado, body);
    res.json(empleado);
  });

  //Crear un nuevo empleado
  router.post("/", (req, res) => {
    //Llama metodo 'created' , pasando los datos del cuerpo de la solicitud
    const result = service.created(req.body);

    if(!result.success){
      //Si la validacion en service falla, devuelve un mensaje de error
      return res.status(400).json({message: result.message});
    }

    //Si todo a salido bien, devulve el empleado creado
    res.status(201).json({
      message: result.message,
      empleado: result.empleado
    });
  });

  //Actualizar un empleado

   
// Exportar el router como predeterminado
export default router;