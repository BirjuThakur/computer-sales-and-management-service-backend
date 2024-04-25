const mongoose = require("mongoose");

const createProduct = new mongoose.Schema({
productcode:{type:Number},
name:{type:String},
price:{type:Number},
category:{type:String},
quantity:{type:Number},
onhand:{type:Number}
},{timestamps:true});

const Product = mongoose.model("Product",createProduct);

module.exports = Product;