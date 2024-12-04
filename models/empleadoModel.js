import mongoose from "mongoose";

  const empleadosSchema = new mongoose.Schema({
    numeroEmpleado:{
      type:Number,
      required: true,
      unique:true,
    },
    nombre:{
      type: String,
      required: true,
      unique: true,
    },
    apellido:{
      type: String,
      required: true,
      unique: true,
    },
    edad:{
      type: String,
      required: true,
    },
    genero:{
      type:String,
      required: true,
      enum: ["Masculino", "Femenino", "Prefiero no decirlo"],
    },
    departamentoId: [
      {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Departamento",
        validate:{
          validator: async function (value){
            const count = await mongoose.models.departamentoId.countDocuments({_id: value});
            return count > 0;
          },
        },
      },
    ],
  });

  const empleados = mongoose.model("Empleado", empleadosSchema);

  export default empleados;
  