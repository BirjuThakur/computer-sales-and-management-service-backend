const mongoose = require("mongoose");

const createCustomer = new mongoose.Schema({
firstname:{type:String},
lastname:{type:String},
phonenumber:{type:Number}
},{timestamps:true});

const Customer = mongoose.model("Customer",createCustomer);

module.exports = Customer;