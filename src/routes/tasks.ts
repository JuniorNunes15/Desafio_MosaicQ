import express from "express";
import Task from "../models/model_task";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: "O título é obrigatório." });
    const task = await Task.query().insert({ title, description, status, created_at: new Date() });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
});

router.get("/", async (_, res) => {
  const tasks = await Task.query();
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await Task.query().findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Tarefa não encontrada." });
  res.json(task);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.query().patchAndFetchById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
});

router.delete("/:id", async (req, res) => {
  const deleted = await Task.query().deleteById(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Tarefa não encontrada." });
  res.status(204).send();
});

export default router;