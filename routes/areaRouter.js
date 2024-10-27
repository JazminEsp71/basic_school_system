import express from 'express';
import areaService from '../services/areaService.js';

const router = express.Router();
const service = new areaService();  //Instancia del servicio
 
// Obtener todos los empleados
router.get("/", (req, res) => {
    const area = service.getAll();
    res.json(area);
  }); 
  
// Exportar el router como predeterminado
export default router;
