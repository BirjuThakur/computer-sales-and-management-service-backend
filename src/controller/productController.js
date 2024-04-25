const Product = require("../modals/productSchema");

const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const generatedProduct = new Product(newProduct); 
        const savedProduct = await generatedProduct.save();
        res.status(201).send({
            success: true,
            message: "New Product created successfully",
            savedProduct 
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in creating Product",
            error: error.message
        });
    }
};

const allProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, productcode,name,price,category,quantity,onhold } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: new RegExp(name, 'i') };
        }
        if (category) {
            query.category = { $regex: new RegExp(category, 'i') };
        }
        if (productcode) {
            const phoneNumberAsNumber = parseInt(productcode);
            query.productcode = phoneNumberAsNumber;
        }
        if (price) {
            const phoneNumberAsNumber = parseInt(price);
            query.price = phoneNumberAsNumber;
        }
        if (quantity) {
            const phoneNumberAsNumber = parseInt(quantity);
            query.quantity = phoneNumberAsNumber;
        }
        if (onhold) {
            const phoneNumberAsNumber = parseInt(onhold);
            query.onhold = phoneNumberAsNumber;
        }
        const skip = (page - 1) * limit;
        const produtcs = await Product.find(query)
            .skip(skip)
            .limit(parseInt(limit));
        const totalNewproducts = await Product.countDocuments(query);
        res.status(200).send({
            success: true,
            message: "Customers retrieved successfully",
            produtcs,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalNewproducts / limit),
                totalNewproducts,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving product",
            error: error.message
        });
    }
};

const singleProduct =async(req,res) =>{
    try {
        const {userid} = req.params;
        const singleproduct = await Product.findById(userid);
        res.status(200).send({
            success: true,
            message: "products retrieved successfully",
            singleproduct,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving product",
            error: error.message
        });
    }
};

const updateProduct =async(req,res) =>{
    try {
        const {userid} = req.params;
        const newProduct = req.body;
        const updateproduct = await Product.findByIdAndUpdate(userid,newProduct,{new:true});
        res.status(200).send({
            success: true,
            message: "product updated successfully",
            updateproduct,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving product",
            error: error.message
        });  
    }
};

const deleteProduct = async(req,res) =>{
    try {
        const {userid} = req.params;
        const deleteproduct = await Product.findByIdAndDelete(userid);
        res.status(200).send({
            success: true,
            message: "product deleted successfully",
            deleteproduct,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving product",
            error: error.message
        });  
    }
};

module.exports = {
    createProduct, 
    allProducts,
    singleProduct,
    updateProduct,
    deleteProduct 
};