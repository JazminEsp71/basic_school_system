import areas from "../models/areaModel.js";

class AreaService {
  constructor() {
    this.areas = [...areas]; // Crear una copia de los datos de área
    this.currentId = this.areas.length + 1; // Continuar el ID desde el último en el modelo
  }

 // Validar si el edificio existe
 validateEdificio(edificio) {
  return this.areas.some((area) => area.edificio === edificio)
    ? { success: true }
    : {
        success: false,
        message: `El edificio ${edificio} no existe. Verifica los datos`,
      };
}

// Crear una nueva área
create(data) {
  // Validar edificio
  const validateEdificioResult = this.validateEdificio(data.edificio);
  if (!validateEdificioResult.success) return validateEdificioResult;

  const newArea = {
    idArea: this.currentId++,
    ...data
  };

  this.areas.push(newArea);
  return newArea;
}

//Obtener todos los datos de Area
  getAll() {
    return this.areas;
  }
//Obtenerlo por el ID dado
  getById(id) {
    return this.areas.find(area => area.idArea === id);
  }
//Modificar un area
  update(id, changes){//parametros necesarios 
    const index = this.areas.findIndex(area => area.idArea === id);
    if (index === -1) {
      throw new Error("Area not found");
    }
    const area = this.areas[index];
    this.areas[index] = { ...area, ...changes };
    return this.areas[index];
  }
//Eliminar un Area
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
