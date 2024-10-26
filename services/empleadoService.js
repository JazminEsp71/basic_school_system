import empleados from "../models/empleadoModel.js";

export default class empleadoService{
    constructor(){
        //Utiliza el array de empleados importado de la carpeta 'models'
        this.empleados = empleados;  // Almacenamos los datos de 'empleadoModel'
    }

    //Obtener todos los empleados almacenados
    getAll(){
        return this.empleados;
    }
}