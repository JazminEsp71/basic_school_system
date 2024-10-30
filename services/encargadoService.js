import encargados from "../models/encargadoModel.js";

class EncargadoService {
  constructor() {
    this.encargados = [...encargados]; // Crear una copia de los datos de encargado
    this.currentId = this.encargados.length + 1; // Continuar el ID desde el último en el modelo
  }

  // Crear un nuevo encargado
  create(data) {
    const newEncargado = {
      idEncargado: this.currentId++,
      ...data,
    };
    this.encargados.push(newEncargado);
    return { message: "Encargado creado", encargado: newEncargado };
  }

  // Obtener todos los encargados
  getAll() {
    return this.encargados;
  }

  // Obtener un encargado por el ID dado
  getById(id) {
    return this.encargados.find((encargado) => encargado.idEncargado === id);
  }

  // Modificar un encargado
  update(id, changes) {
    const index = this.encargados.findIndex((encargado) => encargado.idEncargado === id);
    if (index === -1) {
      throw new Error("Attendant not found");
    }
    const encargado = this.encargados[index];
    this.encargados[index] = { ...encargado, ...changes };
    return { message: "Encargado actualizado", encargado: this.encargados[index] };
  }

  // Eliminar un encargado
  delete(id) {
    const index = this.encargados.findIndex((encargado) => encargado.idEncargado === id);
    if (index === -1) {
      throw new Error("Attendant not found");
    }
    this.encargados.splice(index, 1);
    return { message: "Encargado eliminado" };
  }
}

export default EncargadoService;

