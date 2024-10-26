import express from 'express';
import empleadoService from '../services/empleadoService.js';

const router = express.Router();
const service = new empleadoService();  //Instancia del servicio
 
// Obtener todos los empleados
router.get("/", (req, res) => {
    const empleados = service.getAll();
    res.json(empleados);
  }); 
  
// Exportar el router como predeterminado
export default router;