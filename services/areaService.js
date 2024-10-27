import areas from "../models/areaModel.js";

export default class areaService{
    constructor(){
        //Utiliza el array de empleados importado de la carpeta 'models'
        this.areas = areas;  // Almacenamos los datos de 'empleadoModel'
    }

    //Obtener todos los empleados almacenados
    getAll(){
        return this.areas;
    }
}
