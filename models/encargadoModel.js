import mongoose from "mongoose";

  const encargadosSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    estudio:{
      type: String,
      required: true,
      trim: true,
    },
    turno:{
      type: String,
      required: true,
      enum: ["Matutino", "Vespertino"]
    },
  });

  const encargados = mongoose.model("Encargado", encargadosSchema);

  export default encargados;