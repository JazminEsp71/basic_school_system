import { faker } from "@faker-js/faker";
import departamentos from "../models/departamentoModel.js";
import empleados from "../models/empleadoModel.js"; //empleados

class empleadoService {
  //Crear empleado
  async created(data) {
    const {departamentos} = data;
    for (const departamentoId of departamentos) {
        const departamento = await departamentos.findById(departamentoId);
        if (!departamento) {
          throw new Error(`El departamento ${departamentoId} no existe, intentalo nuevamente.`)
      }
    }
    const lastEmpleado = await empleados.findOne().sort({numeroEmpleado: -1});
    const numeroEmpleado = lastEmpleado ? lastEmpleado.numeroEmpleado + 1: 1;
    
    const newEmpleado = new empleados({...data, numeroEmpleado});
    await newEmpleado.save();
    return newEmpleado
  }

  //Obtener todos los empleados almacenados
  async getAll() {
    return await empleados.find()
    .populate("departamentos", "numeroDepartamento nombre")
    .sort({numeroEmpleado: 1});
  }

  //Obtener por id
  async getById(id) {
    const empleado = await empleados.findOne({numeroEmpleado})
      .populate("departamentos", "numeroDepartamento nombre");
      if(!empleado){
        throw new Error("Empleado no encontrado, intenta nuevamente.")
      }
    return empleado;
  }
  //Actualizar
  async update(numeroEmpleado, data) {
    const {departamentos} = data;
    if (departamentos) {
      for(const id of departamentos){
        const departamento = await departamentos.findById(id);
        if(!departamento){
          throw new Error(`El departamento ${id} no existe.`);
        }
      }
    }
    const updateEmpleado = await empleados.findOneAndUpdate(
      {numeroEmpleado},
      data,
      {new:true, runValidators: true}
    );
    if(!updateEmpleado){
      throw new Error("Empleado no encontrado, intenta nuevamente.");
    }
    return updateEmpleado;
  }

  //Eliminar empleado
  async delete(numeroEmpleado) {
    const deleteEmpleado = await empleados.findOneAndDelete({numeroEmpleado});
    if(!deleteEmpleado){
        throw new Error("Empleado no encontrado, intentalo nuevamente.");
    }
    return deleteEmpleado;
  }
}
export default empleados;