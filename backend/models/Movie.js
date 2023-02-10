const mongoose = require('mongoose');
const {moviesDB} = require("../db");

const Movie = moviesDB.model('Movie', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Movie; 