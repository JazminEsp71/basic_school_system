import areas from "../models/areaModel.js";

class AreaService {
  constructor() {
    this.areas = [...areas]; // Crear una copia de los datos de área
    this.currentId = this.areas.length + 1; // Continuar el ID desde el último en el modelo
  }

  create(data) {
    const newArea = {
      idArea: this.currentId++,
      ...data
    };
    this.areas.push(newArea);
    return newArea;
  }

  getAll() {
    return this.areas;
  }

  getById(id) {
    return this.areas.find(area => area.idArea === id);
  }

  update(id, changes) {
    const index = this.areas.findIndex(area => area.idArea === id);
    if (index === -1) {
      throw new Error("Area not found");
    }
    const area = this.areas[index];
    this.areas[index] = { ...area, ...changes };
    return this.areas[index];
  }

  delete(id) {
    const index = this.areas.findIndex(area => area.idArea === id);
    if (index === -1) {
      throw new Error("Area not found");
    }
    this.areas.splice(index, 1);
    return { id };
  }
}

export default AreaService;
