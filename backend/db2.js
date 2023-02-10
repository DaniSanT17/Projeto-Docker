const mongoose = require("mongoose");

const dbUrl = "mongodb://db-shows/project2";

const showsDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Connected to MongoDB-Shows: " + dbUrl);


const close = () => showsDB.close();

module.exports = { showsDB, close, url: dbUrl };
