import { faker } from "@faker-js/faker";
import departamentos from "../models/departamentoModel.js";
import empleados from "../models/empleadoModel.js"; //empleados

export default class empleadoService{
    constructor(){
        //Utiliza el array de empleados importado de la carpeta 'models'
        this.empleados = empleados;  // Almacenamos los datos de 'empleadoModel'
    }

    //Validar si el departamento existe en el array, el metodo some() para verificar
    validateDepartamento(numeroDepartamento){
        const departamentoExist = departamentos.some((departamento) => departamento.numeroDepartamento === numeroDepartamento);
        if(!departamentoExist){
            //devuelve un objeto con la propiedad success: false y un mensaje
            return{
                success:false,
                message: `El id del departamento ${numeroDepartamento} no existe. Por favor, verifica los datos e intenta de nuevo.`,
            };
        }
        return {success: true};
    }

    //Crear empleado
    created(data){
        //Valida numero del departamento
        const validateDepartamentoResult = this.validateDepartamento(data.numeroDepartamento);
        if(!validateDepartamentoResult.success){
            return validateDepartamentoResult;
        }

        //Si la validacion es exitosa, procede la creacion del empleado
        const newEmpleado = {
            numeroEmpleado: faker.number.int({min:1010, max: 1999}),
            ...data,
        };
        this.empleados.push(newEmpleado);
        //devuelve un objeto con la propiedad success: true y un mensaje de exito
        return{
            success: true,
            message: "Empleado creado exitosamente.",
            empleado: newEmpleado,
        }
    }

    //Obtener todos los empleados almacenados
    getAll(){
        return this.empleados;
    }

    //Obtener por id
    getById(id){
        return this.empleados.find(item => item.numeroEmpleado == id);
    }
}