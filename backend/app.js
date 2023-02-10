const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/index");
const movieRoutes = require("./routes/movies");
const showRoutes = require("./routes/shows");
const compareRoutes = require("./routes/compare");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", homeRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/compare", compareRoutes);

module.exports = app;
