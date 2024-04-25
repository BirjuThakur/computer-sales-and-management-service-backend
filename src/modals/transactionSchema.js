const mongoose = require("mongoose");

const createProduct = new mongoose.Schema({
transactionnumber:{type:Number},
customer:{type:String},
noofitems:{type:Number},
},{timestamps:true});

const Transaction = mongoose.model("Transaction",createProduct);

module.exports = Transaction;