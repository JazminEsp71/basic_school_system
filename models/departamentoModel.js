import mongoose from "mongoose";

const departamentosSchema = new mongoose.Schema({
  numeroDepartamento:{
    type: Number,
    required: true,
    unique: true,
  },
  nombre:{
    type:String,
    required: true,
    trim: true,
  },
  idEncargado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Encargado",
    required: true,
  },
  idArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
})

const departamentos = mongoose.model("Departamento", departamentosSchema);
  export default departamentos;