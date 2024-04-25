const Customer = require("../modals/customerSchema");

const createCustomer = async (req, res) => {
    try {
        const newCustomer = req.body;
        const generatedCustomer = new Customer(newCustomer); 
        const savedCustomer = await generatedCustomer.save();
        res.status(201).send({
            success: true,
            message: "New customer created successfully",
            savedCustomer 
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in creating customer",
            error: error.message
        });
    }
};

const allCustomers = async (req, res) => {
    try {
        const { page = 1, limit = 10, firstname,lastname,phonenumber } = req.query;
        const query = {};
        if (firstname) {
            query.firstname = { $regex: new RegExp(firstname, 'i') };
        }
        if (lastname) {
            query.lastname = { $regex: new RegExp(lastname, 'i') };
        }
        if (phonenumber) {
            const phoneNumberAsNumber = parseInt(phonenumber);
            query.phonenumber = phoneNumberAsNumber;
        }
        const skip = (page - 1) * limit;
        const customers = await Customer.find(query)
            .skip(skip)
            .limit(parseInt(limit));
        const totalNewCustomers = await Customer.countDocuments(query);
        res.status(200).send({
            success: true,
            message: "Customers retrieved successfully",
            customers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalNewCustomers / limit),
                totalNewCustomers,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving customers",
            error: error.message
        });
    }
};

const singleCustomer =async(req,res) =>{
    try {
        const {userid} = req.params;
        const singleuser = await Customer.findById(userid);
        res.status(200).send({
            success: true,
            message: "Customers retrieved successfully",
            singleuser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving customers",
            error: error.message
        });
    }
};

const updateCustomer =async(req,res) =>{
    try {
        const {userid} = req.params;
        const newCustomer = req.body;
        const updateuser = await Customer.findByIdAndUpdate(userid,newCustomer,{new:true});
        res.status(200).send({
            success: true,
            message: "Customers updated successfully",
            updateuser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving customers",
            error: error.message
        });  
    }
};

const deleteCustomer = async(req,res) =>{
    try {
        const {userid} = req.params;
        const deleteuser = await Customer.findByIdAndDelete(userid);
        res.status(200).send({
            success: true,
            message: "Customers deleted successfully",
            deleteuser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving customers",
            error: error.message
        });  
    }
};

module.exports = {
    createCustomer, 
    allCustomers,
    singleCustomer,
    updateCustomer,
    deleteCustomer 
};