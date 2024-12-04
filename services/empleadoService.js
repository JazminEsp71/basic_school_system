import { faker } from "@faker-js/faker";
import departamentos from "../models/departamentoModel.js";
import empleados from "../models/empleadoModel.js"; //empleados

export default class empleadoService {
  constructor() {
    //Utiliza el array de empleados importado de la carpeta 'models'
    this.empleados = empleados; // Almacenamos los datos de 'empleadoModel'
  }

  //Validar si el departamento existe en el array usando el metodo some() 
  validateDepartamento(numeroDepartamento) {
    const departamentoExist = departamentos.some(
      (departamento) => departamento.numeroDepartamento === numeroDepartamento
    );
    if (!departamentoExist) {
      //devuelve un objeto con la propiedad success: false y un mensaje
      return {
        success: false,
        message: `El id del departamento ${numeroDepartamento} no existe. Por favor, verifica los datos e intenta de nuevo.`,
      };
    }
    return { success: true };
  }

  //Crear empleado
  created(data) {
    //Valida numero del departamento en data
    const idsParaValidar = [
      data.departamentoId,
      data.departamentoId2,
      data.departamentoId3,
    ];
    for (let id of idsParaValidar) {
        // Solo valida si el ID del departamento existe en `data`
      if (id) {  
        const validateDepartamentoResult = this.validateDepartamento(id);
        if (!validateDepartamentoResult.success) {
            // Si alguna validación falla, devuelve el resultado
          return validateDepartamentoResult;
        }
      }
    }

    //Si la validacion es exitosa, procede con la creacion del empleado
    const newEmpleado = {
      numeroEmpleado: faker.number.int({ min: 1010, max: 1999 }),
      ...data,
    };
    this.empleados.push(newEmpleado);
    //devuelve un objeto con la propiedad success: true y un mensaje de exito
    return {
      success: true,
      message: "Empleado creado exitosamente.",
      empleado: newEmpleado,
    };
  }

  //Obtener todos los empleados almacenados
  getAll() {
    return this.empleados;
  }

  //Obtener por id
  getById(id) {
    return this.empleados.find((item) => item.numeroEmpleado == id);
  }

  //Actualizar
  update(numeroEmpleado, data) {
    //Encuentra el indice del empleado en el array
    const empleadoIndex = this.empleados.findIndex(
      (item) => item.numeroEmpleado === numeroEmpleado
    );

    if (empleadoIndex === -1) {
        // Devuelve un mensaje de error si el empleado no existe
      return {
        success: false,
        message: `El empleado con id: ${numeroEmpleado} no existe. Por favor, verifica los datos e intenta de nuevo.`,
      };
    }

    //Valida los ids de los departamentos antes de actualizar
    const idsParaValidar = [
      data.departamentoId,
      data.departamentoId2,
      data.departamentoId3,
    ];
    for(let id of idsParaValidar){
        if(id){//solo valida si el id de departamento existe en `data`
            const validateDepartamentoResult = this.validateDepartamento(id);
            if(!validateDepartamentoResult.success){
                // Si falla, devuelve el mensaje de error
                return validateDepartamentoResult;
            }
        }
    }

    // Actualiza los datos del empleado
    this.empleados[empleadoIndex] = {
      ...this.empleados[empleadoIndex],
      ...data,
    };

    return {
      success: true,
      message: "Empleado actualizado exitosamente",
      empleado: this.empleados[empleadoIndex],
    };
  }

  //Eliminar empleado
  delete(numeroEmpleado) {
    const empleadoIndex = this.empleados.findIndex(
      (item) => item.numeroEmpleado === Number(numeroEmpleado)
    );

    //Verifica si el empleado existe
    if (empleadoIndex === -1) {
      return {
        success: false,
        message: `El empleado con id: ${numeroEmpleado} no existe. Por favor, verifica los datos e intenta de nuevo.`,
      };
    }

    //Verifica si el empleado tiene relacion con departamento que impidan su eliminacion
    const empleado = this.empleados[empleadoIndex];
    const departamentosRelacionados = [
      empleado.departamentoId,
      empleado.departamentoId2,
      empleado.departamentoId3,
    ];

    //Verifica si alguno de estos departamentos sigue existiendo en el modelo de departamentos
    const departamentoRelacionado = departamentos.some((departamento) =>
      departamentosRelacionados.includes(departamento.numeroDepartamento)
    );

    if (departamentoRelacionado) {
      return {
        success: false,
        message:
          "No se puede eliminar el empleado ya que está relacionado con uno o más departamentos. Por favor, verifica los datos e intenta de nuevo.",
      };
    }

    //Si no tiene relaciones, elimina el empleado
    this.empleados.splice(empleadoIndex, 1);
    return {
      success: true,
      message: "Empleado eliminado exitosamente.",
      numeroEmpleado,
    };
  }
}
