//Importa rutas
import { Router } from "express";
import empleadoRoutes from "./empleadoRoutes.js";
import departamentoRoutes from "./departamentoRoutes.js";
import encargadoRoutes from "./encargadoRoutes.js";
import areaRoutes from "./areaRoutes.js";

const router = Router();

// Definir las rutas para cada entidad
router.use("/empleados", empleadoRoutes);
router.use("/departamentos", departamentoRoutes);
router.use("/encargados", encargadoRoutes);
router.use("/areas", areaRoutes);

export default router;
