const Empoly = require("../modals/employSchema");

const createEmploy = async (req, res) => {
    try {
        const newEmploy = req.body;
        const generatedEmploy = new Empoly(newEmploy); 
        const savedEmploy = await generatedEmploy.save();
        res.status(201).send({
            success: true,
            message: "New Employ created successfully",
            savedEmploy 
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in creating employ",
            error: error.message
        });
    }
};

const allEmploy = async (req, res) => {
    try {
        const { page = 1, limit = 10, firstname,lastname,role } = req.query;
        const query = {};
        if (firstname) {
            query.firstname = { $regex: new RegExp(firstname, 'i') };;
        }
        if (lastname) {
            query.lastname = { $regex: new RegExp(lastname, 'i') };;
        }
        if (role) {
            query.role = { $regex: new RegExp(role, 'i') };;
        }
        const skip = (page - 1) * limit;
        const employs = await Empoly.find(query)
            .skip(skip)
            .limit(parseInt(limit));
        const totalNewemploy = await Empoly.countDocuments(query);
        res.status(200).send({
            success: true,
            message: "employ retrieved successfully",
            employs,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalNewemploy / limit),
                totalNewemploy,
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

const singleEmploy =async(req,res) =>{
    try {
        const {userid} = req.params;
        const singleuser = await Empoly.findById(userid);
        res.status(200).send({
            success: true,
            message: "Empolys retrieved successfully",
            singleuser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving Empolys",
            error: error.message
        });
    }
};

const updateEmploy =async(req,res) =>{
    try {
        const {userid} = req.params;
        const newCustomer = req.body;
        const updateuser = await Empoly.findByIdAndUpdate(userid,newCustomer,{new:true});
        res.status(200).send({
            success: true,
            message: "employ updated successfully",
            updateuser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving employ",
            error: error.message
        });  
    }
};

const deleteEmploy = async(req,res) =>{
    try {
        const {userid} = req.params;
        const deleteuser = await Empoly.findByIdAndDelete(userid);
        res.status(200).send({
            success: true,
            message: "employs deleted successfully",
            deleteuser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving employ",
            error: error.message
        });  
    }
};

module.exports = {
    createEmploy,
    allEmploy,
    updateEmploy,
    singleEmploy,
    deleteEmploy 
};