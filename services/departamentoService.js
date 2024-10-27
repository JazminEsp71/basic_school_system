import departamentos from "../models/departamentoModel.js"; // departamentos
import encargados from "../models/encargadoModel.js"; // encargados
import areas from "../models/areaModel.js"; // áreas
import { faker } from "@faker-js/faker"; // biblioteca faker

export default class departamentoService {
  constructor() {
    //Utiliza el array de departamentos importado de la carpeta 'models'
    this.departamentos = departamentos; //Almacena los datos de 'departamentoModel'
  }

  //Valida si el numero de encargado existe en el array, el método some() para verificar
  validateEncargado(idEncargado) {
    const encargadoExist = encargados.some(
      (encargado) => encargado.idEncargado === idEncargado
    );
    if (!encargadoExist) {
      //devuelves un objeto con la propiedad success: false y un mensaje
      return {
        success: false,
        message: `El id de encargado ${data.idEncargado} no existe. Por favor, verifica los datos e intenta de nuevo.`,
      };
    }
    return { success: true };
  }

  //Valida si el numero de area existe en el array, el método some() para verificar
  validateArea(idArea) {
    const areaExist = areas.some((area) => area.idArea === idArea);
    if (!areaExist) {
      //devuelves un objeto con la propiedad success: false y un mensaje
      return {
        success: false,
        message: `El id de area ${data.idArea} no existe. Por favor, verifica los datos e intenta de nuevo.`,
      };
    }
    return { success: true };
  }

  //Crear departamento
  created(data) {
    // Validar numero de encargado
    const validateEncargadoResult = this.validateEncargado(data.idEncargado);
    if (!validateEncargadoResult.success) {
      return validateEncargadoResult;
    }

    // Validar numero de area
    const validateAreaResult = this.validateArea(data.idArea);
    if (!validateAreaResult.success) {
      return validateAreaResult;
    }

    //Si las validaciones son exitosas, procede la creacion del departamento
    const newDepartamento = {
      numeroDepartamento: faker.string.uuid(),
      ...data,
    };
    this.departamentos.push(newDepartamento);
    //devuelves un objeto con la propiedad success: true y un mensaje de exito
    return {
      success: true,
      message: "Departamento creado exitosamente.",
      departamento: newDepartamento,
    };
  }

  //Obtener todos los empleados almacenados
  getAll() {
    return this.departamentos;
  }

  //Obtener por id
  getById(id) {
    return this.departamentos.find((item) => item.numeroDepartamento == id);
  }

  //Actualizar
  update(id, data) {
    //Valida que el departamento por actualizar si exista
    const departamento = this.getById(id);
    if (!departamento) {
      return {
        success: false,
        message: `El departamento con id ${id} no existe.`,
      };
    }

    //Valida que el numero de encargado
    const validateEncargadoResult = this.validateEncargado(data.idEncargado);
    if (!validateEncargadoResult.success) {
      return validateEncargadoResult;
    }

    //Valida que el numero de area
    const validateAreaResult = this.validateArea(data.idArea);
    if (!validateAreaResult.success) {
      return validateAreaResult;
    }

    //Actualiza los datos del departamento
    departamento.idEncargado = data.idEncargado;
    departamento.idArea = data.idArea;
    departamento.nombre = data.nombre;

    return {
      success: true,
      message: "Departamento actualizado.",
      departamento,
    };
  }

  //Borrar datos
  delete(id) {
    //Busca departamento por su id
    const index = this.departamentos.findIndex(item => item.numeroDepartamento === id);

    //Verifica si el departamento existe
    if(index === -1){
        return {
            success: false,
            message: 'El departamento no existe.'
        };
    }

    //Verifica si el departamento tiene relacion con algun encargado o área
    const encargadoRelacionado = encargados.some(encargado => encargado.numeroDepartamento === id);
    const areaRelacionada = areas.some(areas => areas.idArea === id);

    //Si esta relacionado, retorna mensaje de error
    if(encargadoRelacionado ||   areaRelacionada){
        return{
            success: false,
            message: 'No se puede eliminar el departamento ya que esta relacionado con otros datos.',
        }
    }

    //Si no encuentra relaciones, elimina el departamento seleccionado
    this.departamentos.splice(index, 1);
    return{
        success: true,
        message: 'El departamento fue eliminado exitosamente.',
        id
    };
  }
}
