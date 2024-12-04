import areas from "../models/areaModel.js";
import departamentos from "../models/departamentoModel.js";

class AreaService {
  async create(data){
    const newArea = new areas(data);
    await newArea.save();
    return newArea
  }
//Obtener todos los datos de Area
  async getAll() {
    return await areas.find();
  }
//Obtenerlo por el ID dado
  async getById(id) {
    const area = await areas.findById(id);
    if(!area){
      throw new Error("Area no encontrada, revisa nuevamente.");
    }return area;
  }
//Modificar un area
  async update(id, changes){//parametros necesarios 
    const updateArea = await areas.findByIdAnUpdate(id, changes, {
      new: true,
      runValidators: true,
    });
    if (!updateArea) {
      throw new Error("Area no encontrada, revisa nuevamente.");
    }return updateArea;
  }
//Eliminar un Area
  async delete(id) {
    const departArea = await departamentos.find({areaId: id});
    if (departArea.length > 0) {
      throw new Error("Error, no es posible eliminar el area ya que esta asignada a un departamento.");
    }

    const deletedArea = await areas.findByIdAndDelete(id);
    if(!deletedArea){
      throw new Error("Area no encontrada, revisa nuevamente.")
    }
    return deletedArea;
  }
}

export default AreaService;