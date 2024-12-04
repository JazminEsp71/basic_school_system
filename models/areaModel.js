import mongoose from "mongoose";

  const areasSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    edificio:{
      type: String,
      required: true,
      trim: true,
    },
  });

const areas = mongoose.model("Area", areasSchema);

export default areas;