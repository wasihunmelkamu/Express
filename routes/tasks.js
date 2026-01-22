import express from "express";
import Joi from "joi";
import Task from "../model/Task.js";
const router = express.Router();

//validation schema
const tasksSchema = Joi.object({
title: Joi.string().min(3).required(),
description: Joi.string().min(5).required(),
 });
//GET /api/taks-->Fetch all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks); //Non-blocking DB call
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST /api/tasks--> Create new task
router.post("/", async (req, res) => {
  // validate input
  const { error } = tasksSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const task = new Task(req.body);
    await task.save(); // Async save to DB
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//PUT /api/tasks/:id -->Update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE /api/taks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Tasj not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export  default router
