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
   
// Exportar el router como predeterminado
export default router;