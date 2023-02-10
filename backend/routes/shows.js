const express = require("express");
const validateId = require("../middleware/validateId");
const Show = require("../models/Show");

const router = express.Router();

router.get("/", async (req, res) => {
  const shows = await Show.find().sort("title");
  res.send(shows);
});

router.get("/:id", validateId, async (req, res) => {
  const show = await Show.findById(req.params.id);
  if (!show) return res.status(404).send();
  res.send(show);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("Title is required.");

  const show = new Show({ title: req.body.title });
  await show.save();
  res.status(201).send(show);
});

router.delete("/:id", async (req, res) => {
  const show = await Show.findByIdAndDelete(req.params.id);

  if (!show)
    return res.status(404).send("The show with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;
