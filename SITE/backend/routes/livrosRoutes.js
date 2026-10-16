import express from "express";
import { listarLivros, CadastrarLivros, AtualizarLivros, BuscarLivroPorId, ExcluirLivros } from "../controllers/livrosControllers.js";

const router = express.Router();

router.get("/", listarLivros);
router.get("/:id", BuscarLivroPorId);
router.post("/", CadastrarLivros);
router.put("/:id", AtualizarLivros);
router.delete("/:id", ExcluirLivros);

export default router;