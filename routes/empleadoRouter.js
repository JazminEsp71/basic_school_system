import express from 'express';
import empleadoService from '../services/empleadoService.js';
import departamentos from '../models/departamentoModel.js';

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

  //Obtener un departamento por su id
  router.get("/departamento/:numeroDepartamento", (req, res) => {
    const {numeroDepartamento} = req.params;
    const departamentoId = parseInt(numeroDepartamento); // Asegurarse de que sea un número

    // Busca el departamento con el número de departamento especificado
  const viewDepartamento = departamentos.find(c => c.numeroDepartamento === departamentoId);

    if(viewDepartamento){
      res.json(viewDepartamento);
    }else{
      res.status(400).json({ message: `El departamento con id ${numeroDepartamento} no existe.` });
    }
  })

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

  //Actualizar un empleado por id
  router.patch("/:numeroEmpleado", (req, res) => {
    const numeroEmpleado = Number(req.params.numeroEmpleado);
    const result = service.update(numeroEmpleado, req.body);

    if(!result.success){
      res.status(400).json({message: "Empleado no encontrado. Por favor, verifica los datos e intenta de nuevo. "});
    }else{
      res.status(200).json(result)
    }
  });

  //Eliminar un empleado por su id
  router.delete("/:numeroEmpleado", (req, res) => {
    const numeroEmpleado = Number(req.params.numeroEmpleado);
    const deleteEmpleado = service.delete(numeroEmpleado);

    if(!deleteEmpleado.success){
      //si se eliminacion falla, retorna statusCode 400 con mensaje
      return res.status(400).json({message: deleteEmpleado.message});
    }

    //si se elimina correctamente, retorna statusCode 200 con mensaje
    res.status(200).json(deleteEmpleado);
  });
 
   
// Exportar el router como predeterminado
export default router;