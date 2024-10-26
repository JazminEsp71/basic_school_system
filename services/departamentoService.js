import departamentos from "../models/departamentoModel.js"
import { faker } from '@faker-js/faker';  // biblioteca faker

export default class departamentoService{
    constructor(){
        //Utiliza el array de departamentos importado de la carpeta 'models'
        this.departamentos = departamentos; //Almacena los datos de 'departamentoModel'
    }

    created(data){
        const newDepartamento = {
            numeroDepartamento: faker.string.uuid(),
            ...data
        }
        this.departamentos.push(newDepartamento);
        return newDepartamento;
    }

    //Obtener todos los empleados almacenados
    getAll(){
        return this.departamentos;
    }

    //Obtener por id
    getById(id){
        return this.departamentos.find(item => item.numeroDepartamento == id);
    }
}