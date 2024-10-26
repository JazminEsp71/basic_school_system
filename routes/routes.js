//Importa rutas
import empleadoRouter from "./empleadoRouter.js";
import departamentoRoutes from "./departamentoRouter.js";
import encargadoRoutes from "./encargadoRouter.js";
import areaRoutes from "./areaRouter.js";

//funcion rutas de la API
function routerApi(app) {
  // Definir las rutas para cada entidad
  app.use("/empleados", empleadoRouter);
  app.use("/departamentos", departamentoRoutes);
  app.use("/encargados", encargadoRoutes);
  app.use("/areas", areaRoutes);
}

export default routerApi;
