import express, { Router } from "express";
import routerApi from "./routes/routes.js";
 
 const app = express();
 const port = 3000;

 //Enviar json fuera del servidor (si no esta, no se visualizadra el cuerpo(body))
 app.use(express.json());

 //Ruta raiz
 app.get("/", (req, res) => {
    res.send("Servicio escolar basico")
 });

 //Aplicar las rutas de la API
 routerApi(app);
 
 //Puerto
 app.listen(port, () =>{
    console.log("My port is working on: " + port);
 });