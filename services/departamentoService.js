import departamentos from "../models/departamentoModel.js"; // departamentos
import encargados from "../models/encargadoModel.js"; // encargados
import areas from "../models/areaModel.js"; // áreas

export default class departamentoService {
  constructor() {
    this.departamentos = [...departamentos]; // Almacena los datos de 'departamentoModel'
  }

  // Valida si el número de encargado existe
  validateEncargado(idEncargado) {
    return encargados.some((encargado) => encargado.idEncargado === idEncargado)
      ? { success: true }
      : {
          success: false,
          message: `El id de encargado ${idEncargado} no existe. Verifica los datos`,
        };
  }

  // Valida si el número de área existe
  validateArea(idArea) {
    return areas.some((area) => area.idArea === idArea)
      ? { success: true }
      : {
          success: false,
          message: `El id de área ${idArea} no existe. Verifica los datos`,
        };
  }

  // Crear departamento 
  create(data) {
    // Validar existencia de idEncargado y idArea
    const validateEncargadoResult = this.validateEncargado(data.idEncargado);
    if (!validateEncargadoResult.success) return validateEncargadoResult;

    const validateAreaResult = this.validateArea(data.idArea);
    if (!validateAreaResult.success) return validateAreaResult;

    // Generar numeroDepartamento 
    const lastId = this.departamentos.length
      ? Math.max(...this.departamentos.map((d) => d.numeroDepartamento))
      : 0;
    const newDepartamento = {
      numeroDepartamento: lastId + 1,
      nombre: data.nombre,
      idEncargado: data.idEncargado,
      idArea: data.idArea,
    };

    this.departamentos.push(newDepartamento);
    return {
      success: true,
      message: "Departamento creado exitosamente",
      departamento: newDepartamento,
    };
  }

  // Obtener todos los departamentos
  getAll() {
    return this.departamentos;
  }

  // Obtener por ID
  getById(id) {
    const departamento = this.departamentos.find((item) => item.numeroDepartamento === id);
    return departamento
      ? { success: true, departamento }
      : { success: false, message: `El departamento con id ${id} no existe` };
  }

  // Actualizar
  update(id, data) {
    const departamentoIndex = this.departamentos.findIndex(
      (item) => item.numeroDepartamento === id
    );

    if (departamentoIndex === -1) {
      return { success: false, message: `El departamento con id ${id} no existe` };
    }

    const validateEncargadoResult = this.validateEncargado(data.idEncargado);
    if (!validateEncargadoResult.success) return validateEncargadoResult;

    const validateAreaResult = this.validateArea(data.idArea);
    if (!validateAreaResult.success) return validateAreaResult;

    const updatedDepartamento = { ...this.departamentos[departamentoIndex], ...data };
    this.departamentos[departamentoIndex] = updatedDepartamento;

    return {
      success: true,
      message: "Departamento actualizado",
      departamento: updatedDepartamento,
    };
  }

  // Eliminar sin restricciones
  delete(id) {
    const index = this.departamentos.findIndex((item) => item.numeroDepartamento === id);

    if (index === -1) {
      return { success: false, message: "El departamento no existe" };
    }

    this.departamentos.splice(index, 1);
    return {
      success: true,
      message: "El departamento fue eliminado",
      id,
    };
  }
}
