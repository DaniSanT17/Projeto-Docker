const mongoose = require('mongoose');
const {showsDB} = require("../db2");

const Show = showsDB.model('Show', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Show; 