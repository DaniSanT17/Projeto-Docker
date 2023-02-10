const mongoose = require("mongoose");

const dbUrl = "mongodb://db-movies/project1";

const moviesDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Connected to MongoDB-Movies: " + dbUrl);


const close = () => moviesDB.close();

module.exports = { moviesDB, close, url: dbUrl };
