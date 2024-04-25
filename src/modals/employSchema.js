const mongoose = require("mongoose");

const createEmploy = new mongoose.Schema({
firstname:{type:String},
lastname:{type:String},
role:{type:String}
},{timestamps:true});

const Empoly = mongoose.model("Empoly",createEmploy);

module.exports = Empoly;