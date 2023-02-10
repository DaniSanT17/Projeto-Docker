const express = require("express");
const Movie = require("../models/Movie");
const Show = require("../models/Show");

const router = express.Router();

router.get("/:title", async (req, res) => {
  const {title} = req.params;
  const show = await Show.findOne({title: title});
  const movie = await Movie.findOne({title: title});

  res.send({
    show,
    movie
  });
});


module.exports = router;