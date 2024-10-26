import { Router } from "express";
const router = Router();

// Definir las rutas de área aquí
router.get("/", (req, res) => res.send("Lista de departamentos"));

export default router;
