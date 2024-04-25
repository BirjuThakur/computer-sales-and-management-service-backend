const express = require("express");
const { createCustomer, allCustomers, singleCustomer, updateCustomer, deleteCustomer } = require("../controller/customerController");
const { createEmploy, allEmploy, singleEmploy, updateEmploy, deleteEmploy } = require("../controller/employController");
const { createProduct, allProducts, singleProduct, updateProduct, deleteProduct } = require("../controller/productController");
const { createTransaction, allTransaction, singleTransaction, updateTransaction, deleteTransaction } = require("../controller/transactionController");
const allRoutes = express.Router();

// customer
allRoutes.post("/createcustomer",createCustomer);
allRoutes.get("/allcustomers",allCustomers);
allRoutes.get("/singlecustomer/:userid",singleCustomer);
allRoutes.put("/updatecustomer/:userid",updateCustomer);
allRoutes.delete("/deletecustomer/:userid",deleteCustomer);

// emloy
allRoutes.post("/createemploy",createEmploy);
allRoutes.get("/allEmploy",allEmploy);
allRoutes.get("/singleemploy/:userid",singleEmploy);
allRoutes.put("/updateemploy/:userid",updateEmploy);
allRoutes.delete("/deleteemploy/:userid",deleteEmploy);

// product
allRoutes.post("/createproduct",createProduct);
allRoutes.get("/allproducts",allProducts);
allRoutes.get("/singleproduct/:userid",singleProduct);
allRoutes.put("/updateproduct/:userid",updateProduct);
allRoutes.delete("/deleteproduct/:userid",deleteProduct);

// transaction
allRoutes.post("/createtransaction",createTransaction);
allRoutes.get("/alltransactions",allTransaction);
allRoutes.get("/singletransaction/:userid",singleTransaction);
allRoutes.put("/updatetransaction/:userid",updateTransaction);
allRoutes.delete("/deletetransaction/:userid",deleteTransaction);

module.exports = allRoutes;